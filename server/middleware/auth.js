import jwt from 'jsonwebtoken';

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const token = req.headers.authorization?.split(' ')[1];

    // Si no hay token
    if (!token) {
      return res.status(401).json({
        error: 'No autorizado',
        message: 'Token no proporcionado'
      });
    }

    console.log('Secreto JWT cargado (Solo para debug):', process.env.JWT_SECRET ? 'CARGADO' : 'ERROR: NO CARGADO');
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar la información del usuario en req.user
    req.user = decoded;

    // console.log('EXITO: Token válido. Usuario ID:', req.user.id)

    // Continuar al siguiente middleware/ruta
    next();

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado',
        message: 'Por favor inicia sesión nuevamente'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token inválido',
        message: 'El token no es válido'
      });
    }

    return res.status(401).json({
      error: 'No autorizado',
      message: error.message
    });
  }
};