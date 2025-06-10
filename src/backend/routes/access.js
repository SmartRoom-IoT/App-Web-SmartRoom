const express = require('express');
const router = express.Router();
const AccessLog = require('../models/accessLog');
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware'); // Importar middleware de autenticación

// Aplicar middleware de autenticación a las rutas que lo requieran
// router.use(authMiddleware); // Descomentar para proteger todas las rutas de acceso

// Registrar entrada
router.post('/entry', async (req, res) => {
  try {
    const { rfid_tag, dispositivo_acceso } = req.body;
    const user = await User.findOne({ rfid_tag });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado con este RFID' });
    }

    const newLog = new AccessLog({
      id_historial: require('uuid').v4(), // Generar UUID
      id_usuario: user._id, // Usar el ID de MongoDB del usuario
      fecha_hora_entrada: new Date(),
      dispositivo_acceso,
    });
    await newLog.save();

    // Aquí podrías emitir una notificación por WebSocket
    // wss.clients.forEach(client => { client.send(JSON.stringify({ type: 'access_entry', log: newLog })); });

    res.status(201).json({ message: 'Entrada registrada con éxito', log: newLog });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar entrada', error });
  }
});

// Registrar salida (ejemplo: encontrar la última entrada sin salida para este usuario)
router.post('/exit', async (req, res) => {
  try {
    const { rfid_tag } = req.body;
    const user = await User.findOne({ rfid_tag });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado con este RFID' });
    }

    const latestEntry = await AccessLog.findOneAndUpdate(
      { id_usuario: user._id, fecha_hora_salida: null },
      { fecha_hora_salida: new Date() },
      { new: true, sort: { fecha_hora_entrada: -1 } } // Encontrar la más reciente sin salida
    );

    if (!latestEntry) {
      return res.status(404).json({ message: 'No se encontró una entrada abierta para este usuario' });
    }

    // Aquí podrías emitir una notificación por WebSocket
    // wss.clients.forEach(client => { client.send(JSON.stringify({ type: 'access_exit', log: latestEntry })); });

    res.status(200).json({ message: 'Salida registrada con éxito', log: latestEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar salida', error });
  }
});

// Obtener historial de acceso (protegida con authMiddleware)
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const history = await AccessLog.find().populate('id_usuario', 'nombre').sort({ fecha_hora_entrada: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener historial de acceso', error });
  }
});

module.exports = router;