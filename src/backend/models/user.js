const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id_usuario: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  rfid_tag: { type: String, unique: true },
  preferencias: {
    lightColor: { type: String, default: '#ffffff' },
    idealTemperature: { type: Number, default: 22 },
  },
  fecha_creacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);