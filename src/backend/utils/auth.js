const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  // Reemplaza 'your_jwt_secret' con una clave secreta fuerte y única
  return jwt.sign({ userId }, 'your_jwt_secret', { expiresIn: '4h' });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    return decoded.userId;
  } catch (error) {
    return null; // Token inválido o expirado
  }
};

module.exports = { generateToken, verifyToken };