const mongoose = require('mongoose');

const automatedActionSchema = new mongoose.Schema({
  id_accion: { type: String, required: true, unique: true },
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dispositivo_activado: { type: String, required: true }, // ventilador, luz, aire acondicionado
  configuracion_aplicada: { type: Object }, // ejemplo: { color: '#0000ff', temperature: 22 }
  fecha_hora_accion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AutomatedAction', automatedActionSchema);