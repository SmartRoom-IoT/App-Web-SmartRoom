const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  id_historial: { type: String, required: true, unique: true },
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fecha_hora_entrada: { type: Date, required: true },
  fecha_hora_salida: { type: Date },
  dispositivo_acceso: { type: String, required: true }, // RFID, reconocimiento facial, etc.
});

module.exports = mongoose.model('AccessLog', accessLogSchema);