const express = require('express');
const router = express.Router();
const AutomatedAction = require('../models/automatedAction');
const authMiddleware = require('../middleware/authMiddleware'); // Importar middleware de autenticación

// Aplicar middleware de autenticación a las rutas que lo requieran
// router.use(authMiddleware); // Descomentar para proteger todas las rutas de acciones

// Registrar una acción automatizada (protegida con authMiddleware)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // El id_usuario se obtiene del token en el middleware
    const id_usuario = req.userId;
    const { dispositivo_activado, configuracion_aplicada } = req.body;

    const newAction = new AutomatedAction({
      id_accion: require('uuid').v4(), // Generar UUID
      id_usuario,
      dispositivo_activado,
      configuracion_aplicada,
    });
    await newAction.save();
    res.status(201).json({ message: 'Acción automatizada registrada con éxito', action: newAction });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar acción automatizada', error });
  }
});

// Obtener historial de acciones por usuario (protegida con authMiddleware)
router.get('/history/:id_usuario', authMiddleware, async (req, res) => {
  try {
    const { id_usuario } = req.params;
    // Opcional: verificar que el usuario solicitando el historial sea el mismo que el del token (req.userId)
    if (req.userId !== id_usuario) {
       // return res.sendStatus(403); // Prohibido si no es el mismo usuario
    }
    const history = await AutomatedAction.find({ id_usuario }).sort({ fecha_hora_accion: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener historial de acciones', error });
  }
});

module.exports = router;