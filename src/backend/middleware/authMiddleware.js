const { verifyToken } = require('../utils/auth');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // Si no hay token, no autorizado
  }

  const userId = verifyToken(token);

  if (!userId) {
    return res.sendStatus(403); // Si el token no es válido, prohibido
  }

  req.userId = userId; // Agregar el ID de usuario a la solicitud
  next(); // Continuar con la siguiente función middleware o ruta
};

module.exports = authMiddleware;