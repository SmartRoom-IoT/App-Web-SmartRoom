const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { generateToken } = require('../utils/auth'); // Importar la función para generar token

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, rfid_tag, preferencias } = req.body;
    // Aquí deberías agregar lógica para manejar contraseñas si las usas para login
    const newUser = new User({
      id_usuario: require('uuid').v4(), // Generar UUID
      nombre,
      rfid_tag,
      preferencias,
    });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

// Ruta de inicio de sesión (ejemplo básico con RFID)
router.post('/login', async (req, res) => {
  try {
    const { rfid_tag } = req.body;
    const user = await User.findOne({ rfid_tag });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Generar token al iniciar sesión
    const token = generateToken(user._id);
    res.status(200).json({ message: 'Inicio de sesión exitoso', user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});

module.exports = router;