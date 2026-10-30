const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');

const JWT_SECRET = process.env.JWT_SECRET || 'herjourney_super_secure_secret_key_2026_lifelong_career_platform';

/**
 * Authentication Middleware:
 * Inspects Authorization: Bearer <jwt> or fallback demo headers.
 * Populates req.user with role, userId, memberId, partnerId.
 */
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  let decodedUser = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      decodedUser = jwt.verify(token, JWT_SECRET);
      req.user = {
        userId: decodedUser.userId || decodedUser.id,
        email: decodedUser.email,
        role: decodedUser.role || 'MEMBER',
        memberId: decodedUser.memberId || null,
        partnerId: decodedUser.partnerId || null
      };
      return next();
    } catch (err) {
      // If token expired or invalid, log and fall back to headers or reject
      console.warn(`JWT verification notice: ${err.message}`);
    }
  }

  // Fallback support for demo role headers
  const role = req.headers['x-user-role'] || 'MEMBER';
  const userId = req.headers['x-user-id'] || null;
  const memberId = req.headers['x-member-id'] || (role === 'MEMBER' ? userId : null);
  const partnerId = req.headers['x-partner-id'] || (role === 'PARTNER' ? userId : null);

  req.user = {
    role,
    userId,
    memberId,
    partnerId
  };

  next();
}

/**
 * Restricts route to specific roles (e.g. 'MANAGER', 'PARTNER')
 */
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return sendError(
        res,
        `Access denied. Role "${req.user?.role || 'Anonymous'}" is not authorized for this resource.`,
        403
      );
    }
    next();
  };
}

/**
 * Member privacy check: Ensures a MEMBER can only view/edit their own data
 */
function authorizeMemberSelf(req, res, next) {
  if (req.user.role === 'MANAGER') {
    return next(); // Managers have elevated administration access
  }

  const requestedMemberId = req.params.memberId || req.params.id;
  if (req.user.role === 'MEMBER' && req.user.memberId && req.user.memberId.toString() !== requestedMemberId) {
    return sendError(
      res,
      'Privacy violation: Members can only access their own career journey and profile.',
      403
    );
  }

  next();
}

module.exports = {
  authenticate,
  authorizeRoles,
  authorizeMemberSelf,
  JWT_SECRET
};
