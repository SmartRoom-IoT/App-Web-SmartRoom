const express = require('express');
const router = express.Router();
const SensorData = require('../models/sensorData');
const authMiddleware = require('../middleware/authMiddleware'); // Importar middleware de autenticación

// Aplicar middleware de autenticación a las rutas que lo requieran
// router.use(authMiddleware); // Descomentar para proteger todas las rutas de sensores

// Registrar datos de sensor (usado por MQTT handler - no necesita authMiddleware si viene de dispositivo)
router.post('/data', async (req, res) => {
  try {
    const { id_sensor, tipo_sensor, ubicacion, valor_sensor } = req.body;
    const newSensorData = new SensorData({
      id_sensor,
      tipo_sensor,
      ubicacion,
      valor_sensor,
    });
    await newSensorData.save();
    res.status(201).json({ message: 'Datos de sensor registrados con éxito', data: newSensorData });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar datos de sensor', error });
  }
});

// Obtener últimos datos de sensores por tipo (protegida con authMiddleware)
router.get('/latest/:tipo_sensor', authMiddleware, async (req, res) => {
  try {
    const { tipo_sensor } = req.params;
    const latestData = await SensorData.findOne({ tipo_sensor }).sort({ fecha_registro: -1 });
    if (!latestData) {
      return res.status(404).json({ message: 'No se encontraron datos para este tipo de sensor' });
    }
    res.status(200).json(latestData);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener últimos datos de sensor', error });
  }
});

// Obtener datos históricos de un sensor (para gráficas) (protegida con authMiddleware)
router.get('/history/:id_sensor', authMiddleware, async (req, res) => {
  try {
    const { id_sensor } = req.params;
    const history = await SensorData.find({ id_sensor }).sort({ fecha_registro: 1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener historial de sensor', error });
  }
});

module.exports = router;