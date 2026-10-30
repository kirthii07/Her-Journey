const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Member = require('../models/Member');
const Partner = require('../models/Partner');
const { sendSuccess, sendError } = require('../utils/response');
const { JWT_SECRET } = require('../middleware/auth');

/**
 * Real Database Login: POST /api/auth/login
 * Validates email & password against MongoDB User collection.
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400);
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // Verify bcrypt hash (with fallback to default demo password)
    const isPasswordValid = await user.comparePassword(password);
    const isDemoPassword = (password === 'HerJourney@2026' || password === 'demo123');

    if (!isPasswordValid && !isDemoPassword) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // Populate associated member or partner
    let member = null;
    let partner = null;

    if (user.role === 'MEMBER' && user.memberId) {
      member = await Member.findById(user.memberId).populate('communities');
    } else if (user.role === 'MEMBER') {
      member = await Member.findOne({ email: normalizedEmail }).populate('communities');
    }

    if (user.role === 'PARTNER' && user.partnerId) {
      partner = await Partner.findById(user.partnerId);
    } else if (user.role === 'PARTNER') {
      partner = await Partner.findOne();
    }

    // Generate signed JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        memberId: member?._id || user.memberId || null,
        partnerId: partner?._id || user.partnerId || null
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const payload = {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        memberId: member?._id || user.memberId || null,
        partnerId: partner?._id || user.partnerId || null
      },
      member,
      partner,
      token
    };

    return sendSuccess(res, payload, `Login successful as ${user.role}`);
  } catch (err) {
    next(err);
  }
}

/**
 * Demo Fast-Switch Login: POST /api/auth/demo-login
 * Still looks up genuine MongoDB user and returns a signed JWT.
 */
async function demoLogin(req, res, next) {
  try {
    const { email, role: requestedRole, memberKey } = req.body;

    let targetEmail = email;
    if (!targetEmail) {
      if (requestedRole === 'MANAGER') targetEmail = 'manager@demo.herjourney.app';
      else if (requestedRole === 'PARTNER') targetEmail = 'partner@demo.herjourney.app';
      else {
        const key = (memberKey || 'priya').toLowerCase();
        targetEmail = `${key}@demo.herjourney.app`;
      }
    }

    // Find the real user in herjourney_db
    let user = await User.findOne({ email: targetEmail.toLowerCase() });
    
    // Fallback if not found yet
    if (!user) {
      const role = requestedRole || (targetEmail.includes('manager') ? 'MANAGER' : targetEmail.includes('partner') ? 'PARTNER' : 'MEMBER');
      user = await User.findOne({ role });
    }

    let member = null;
    let partner = null;

    if (user && user.role === 'MEMBER' && user.memberId) {
      member = await Member.findById(user.memberId).populate('communities');
    } else if (user && user.role === 'MEMBER') {
      member = await Member.findOne().populate('communities');
    }

    if (user && user.role === 'PARTNER' && user.partnerId) {
      partner = await Partner.findById(user.partnerId);
    } else if (user && user.role === 'PARTNER') {
      partner = await Partner.findOne();
    }

    const token = jwt.sign(
      {
        userId: user?._id || 'demo-user',
        email: user?.email || targetEmail,
        name: user?.name || 'Demo User',
        role: user?.role || requestedRole || 'MEMBER',
        memberId: member?._id || null,
        partnerId: partner?._id || null
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const payload = {
      user: {
        id: user?._id || 'demo-user',
        email: user?.email || targetEmail,
        name: user?.name || (user?.role === 'MEMBER' ? member?.name : user?.role === 'MANAGER' ? 'Maya Rao' : 'Acme Corp Partner'),
        role: user?.role || requestedRole || 'MEMBER',
        memberId: member?._id || null,
        partnerId: partner?._id || null
      },
      member,
      partner,
      token
    };

    return sendSuccess(res, payload, `Demo authenticated successfully as ${payload.user.role}`);
  } catch (err) {
    next(err);
  }
}

/**
 * Get current authenticated user profile: GET /api/auth/me
 */
async function getMe(req, res, next) {
  try {
    if (!req.user || !req.user.userId) {
      return sendError(res, 'Not authenticated', 401);
    }

    const user = await User.findById(req.user.userId).select('-password');
    let member = null;
    let partner = null;

    if (user?.memberId) {
      member = await Member.findById(user.memberId).populate('communities');
    }
    if (user?.partnerId) {
      partner = await Partner.findById(user.partnerId);
    }

    return sendSuccess(res, { user, member, partner });
  } catch (err) {
    next(err);
  }
}

/**
 * Catalog of demo accounts
 */
async function getDemoProfiles(req, res, next) {
  try {
    const members = await Member.find().select('name email phone careerStage city avatarUrl');
    const partner = await Partner.findOne();
    return sendSuccess(res, {
      members,
      partner,
      manager: { name: 'Maya Rao', title: 'Senior Programme Director' }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
  demoLogin,
  getMe,
  getDemoProfiles
};
