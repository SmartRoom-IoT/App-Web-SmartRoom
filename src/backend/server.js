const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const mqtt = require('mqtt');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Conexión a MongoDB (reemplazar con tu cadena de conexión)
mongoose.connect('mongodb://localhost:27017/smartroom', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Modelos de Mongoose (definir esquemas y modelos aquí)
// const User = mongoose.model('User', userSchema);
// const AccessLog = mongoose.model('AccessLog', accessLogSchema);
// const SensorData = mongoose.model('SensorData', sensorDataSchema);
// const AutomatedAction = mongoose.model('AutomatedAction', automatedActionSchema);

app.use(cors());
app.use(bodyParser.json());

// Rutas de la API (ejemplos)
app.post('/api/auth/register', (req, res) => {
  // Lógica de registro
  res.send('Registro exitoso');
});

app.post('/api/auth/login', (req, res) => {
  // Lógica de inicio de sesión
  res.send('Inicio de sesión exitoso');
});

app.get('/api/access-logs', (req, res) => {
  // Lógica para obtener historial de acceso
  res.json([]); // Devolver datos reales de MongoDB
});

// Conexión MQTT (reemplazar con tu broker MQTT)
const mqttClient = mqtt.connect('mqtt://localhost');

mqttClient.on('connect', () => {
  console.log('Conectado al broker MQTT');
  mqttClient.subscribe('sensor/data'); // Suscribirse a un topic
});

mqttClient.on('message', (topic, message) => {
  console.log(`Mensaje MQTT recibido en ${topic}: ${message.toString()}`);
  // Procesar mensaje y guardar en DB, enviar por WebSocket
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message.toString());
    }
  });
});

// WebSockets
wss.on('connection', ws => {
  console.log('Cliente WebSocket conectado');
  ws.on('message', message => {
    console.log(`Mensaje WebSocket recibido: ${message}`);
    // Procesar mensajes del frontend (ej: comandos de luz)
    mqttClient.publish('light/control', message.toString()); // Publicar en un topic MQTT
  });
  ws.send('Conectado al servidor WebSocket');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));