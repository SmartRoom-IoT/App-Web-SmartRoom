const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  id_sensor: { type: String, required: true },
  tipo_sensor: { type: String, required: true }, // temperatura, calidad de aire, humedad
  ubicacion: { type: String },
  fecha_registro: { type: Date, default: Date.now },
  valor_sensor: { type: Number, required: true },
});

module.exports = mongoose.model('SensorData', sensorDataSchema);