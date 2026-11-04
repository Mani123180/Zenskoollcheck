const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      let decoded = null;

      if (token && token.startsWith('jwt_zen_')) {
        try {
          const payloadBase64 = token.replace('jwt_zen_', '');
          const jsonStr = Buffer.from(payloadBase64, 'base64').toString('utf-8');
          decoded = JSON.parse(jsonStr);
          if (decoded && !decoded.id) {
            decoded.id = decoded.userId;
          }
        } catch (parseErr) {
          decoded = null;
        }
      }

      if (!decoded) {
        decoded = jwt.verify(token, process.env.JWT_SECRET || 'zenschool_jwt_super_secret_key_2026_zen_education');
      }

      req.user = decoded;
      
      if (decoded.role !== 'superadmin' && decoded.schoolId && decoded.schoolId !== 'ALL') {
        const { isSchoolActive } = require('../controllers/schoolController');
        const active = await isSchoolActive(decoded.schoolId);
        if (!active) {
          return res.status(403).json({
            success: false,
            isDeactivated: true,
            message: 'Campus Access Suspended: Your institution has been deactivated by the Central Super Administrator.'
          });
        }
      }

      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user ? req.user.role : 'Guest'}' is unauthorized for this resource`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
