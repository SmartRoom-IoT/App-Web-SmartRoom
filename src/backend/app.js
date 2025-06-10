const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const mqtt = require('mqtt');
const routes = require('./routes'); // Importar las rutas
const { verifyToken } = require('./utils/auth'); // Importar función para verificar token

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Conexión a MongoDB (reemplazar con tu cadena de conexión)
mongoose.connect('mongodb://localhost:27017/smartroom', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

app.use(cors());
app.use(bodyParser.json());

// Usar las rutas definidas
app.use('/api', routes);

// Conexión MQTT (reemplazar con tu broker MQTT)
const mqttClient = mqtt.connect('mqtt://localhost');

mqttClient.on('connect', () => {
  console.log('Conectado al broker MQTT');
  mqttClient.subscribe('sensor/data'); // Suscribirse a un topic para recibir datos de sensores
  mqttClient.subscribe('access/rfid'); // Suscribirse a un topic para recibir eventos de RFID
});

mqttClient.on('message', async (topic, message) => {
  console.log(`Mensaje MQTT recibido en ${topic}: ${message.toString()}`);
  try {
    const payload = JSON.parse(message.toString());

    if (topic === 'sensor/data') {
      // Procesar datos de sensor y guardar en DB
      const SensorData = require('./models/sensorData');
      const newSensorData = new SensorData({
        id_sensor: payload.id_sensor,
        tipo_sensor: payload.tipo_sensor,
        ubicacion: payload.ubicacion,
        valor_sensor: payload.valor_sensor,
      });
      await newSensorData.save();
      console.log('Datos de sensor guardados en DB');

      // Enviar datos de sensor por WebSocket a los clientes conectados
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'sensor_update', data: newSensorData }));
        }
      });

    } else if (topic === 'access/rfid') {
      // Procesar evento de RFID (entrada/salida)
      const AccessLog = require('./models/accessLog');
      const User = require('./models/user');

      const user = await User.findOne({ rfid_tag: payload.rfid_tag });

      if (user) {
        // Lógica para determinar si es entrada o salida y registrar en DB
        // Esto podría ser más complejo, buscando una entrada abierta para este usuario
        const latestEntry = await AccessLog.findOne({ id_usuario: user._id, fecha_hora_salida: null }).sort({ fecha_hora_entrada: -1 });

        if (latestEntry) {
          // Es una salida
          latestEntry.fecha_hora_salida = new Date();
          await latestEntry.save();
          console.log('Salida registrada para:', user.nombre);
          wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'access_exit', log: latestEntry }));
            }
          });
        } else {
          // Es una entrada
          const newLog = new AccessLog({
            id_historial: require('uuid').v4(),
            id_usuario: user._id,
            fecha_hora_entrada: new Date(),
            dispositivo_acceso: 'RFID',
          });
          await newLog.save();
          console.log('Entrada registrada para:', user.nombre);
          wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'access_entry', log: newLog }));
            }
          });
        }
      } else {
        console.log('RFID no reconocido:', payload.rfid_tag);
        // Aquí podrías enviar una alerta de RFID no reconocido
      }
    }

  } catch (error) {
    console.error('Error procesando mensaje MQTT:', error);
  }
});


// WebSockets
wss.on('connection', ws => {
  console.log('Cliente WebSocket conectado');

  // Opcional: Autenticar conexión WebSocket con token
  // ws.on('message', message => {
  //   const msg = JSON.parse(message.toString());
  //   if (msg.type === 'authenticate' && msg.token) {
  //     const userId = verifyToken(msg.token);
  //     if (userId) {
  //       ws.userId = userId; // Asignar userId a la conexión WebSocket
  //       ws.send(JSON.stringify({ type: 'auth_success', message: 'WebSocket autenticado' }));
  //     } else {
  //       ws.send(JSON.stringify({ type: 'auth_failed', message: 'Token inválido' }));
  //       ws.close(); // Cerrar conexión si la autenticación falla
  //     }
  //   } else {
  //     // Procesar otros mensajes solo si la conexión está autenticada
  //     if (ws.userId) {
  //       try {
  //         const command = JSON.parse(message.toString());
  //         if (command.type === 'light_control') {
  //           mqttClient.publish('light/control', JSON.stringify(command.payload));
  //           console.log('Comando de luz enviado por MQTT:', command.payload);
  //         }
  //       } catch (error) {
  //         console.error('Error procesando mensaje WebSocket:', error);
  //       }
  //     } else {
  //       ws.send(JSON.stringify({ type: 'error', message: 'Conexión no autenticada' }));
  //     }
  //   }
  // });

  // Si no se implementa autenticación en WebSocket, procesar mensajes directamente:
   ws.on('message', message => {
     try {
       const command = JSON.parse(message.toString());
       if (command.type === 'light_control') {
         mqttClient.publish('light/control', JSON.stringify(command.payload));
         console.log('Comando de luz enviado por MQTT:', command.payload);
       }
     } catch (error) {
       console.error('Error procesando mensaje WebSocket:', error);
     }
   });


  ws.send(JSON.stringify({ type: 'connection_status', message: 'Conectado al servidor WebSocket' }));
});

// Integración con ThingSpeak (ejemplo básico)
// Esto generalmente se haría en el ESP32 publicando directamente a ThingSpeak
// o el backend podría reenviar datos de sensores a ThingSpeak si es necesario.
// const ThingSpeakClient = require('thingspeakclient');
// const tsClient = new ThingSpeakClient({ writeKey: 'YOUR_THINGSPEAK_WRITE_API_KEY' });

// function sendToThingSpeak(data) {
//   tsClient.updateChannel(YOUR_CHANNEL_ID, data, (err, resp) => {
//     if (!err && resp > 0) {
//       console.log('Datos enviados a ThingSpeak');
//     } else {
//       console.error('Error enviando datos a ThingSpeak:', err);
//     }
//   });
// }

// Ejemplo de cómo podrías llamar a sendToThingSpeak después de recibir datos de sensor por MQTT
// En el mqttClient.on('message') handler:
// if (topic === 'sensor/data') {
//   // ... guardar en DB ...
//   // sendToThingSpeak({ field1: payload.temperature, field2: payload.airQuality });
// }


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

// DONE