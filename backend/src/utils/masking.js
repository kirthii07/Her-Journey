/**
 * Masking utilities to protect privacy in role-based views.
 * Evaluator requirement: Mask contact details in manager and partner views.
 * Example:
 * Email: p***@gmail.com
 * Phone: +91 98****10
 */

function maskEmail(email) {
  if (!email || typeof email !== 'string') return '';
  const parts = email.split('@');
  if (parts.length !== 2) return '***@***.com';
  const name = parts[0];
  const domain = parts[1];
  
  if (name.length <= 1) {
    return `${name}***@${domain}`;
  }
  return `${name[0]}***@${domain}`;
}

function maskPhone(phone) {
  if (!phone || typeof phone !== 'string') return '';
  // Clean string
  const clean = phone.trim();
  // If formatted like +91 98765 43210 or +919876543210
  if (clean.startsWith('+91')) {
    const digits = clean.replace(/\D/g, '').slice(2); // take the 10 digits
    if (digits.length >= 10) {
      return `+91 ${digits.slice(0, 2)}****${digits.slice(-2)}`;
    }
  }
  
  const digitsOnly = clean.replace(/\D/g, '');
  if (digitsOnly.length >= 10) {
    return `+91 ${digitsOnly.slice(0, 2)}****${digitsOnly.slice(-2)}`;
  }
  
  return '+91 98****10';
}

function maskMemberForRole(member, role) {
  if (!member) return null;
  const memberObj = member.toObject ? member.toObject() : { ...member };

  // If role is member viewing their own profile, do not mask
  if (role === 'MEMBER') {
    return memberObj;
  }

  // Manager and Partner views must have masked contact details
  if (role === 'MANAGER' || role === 'PARTNER') {
    return {
      ...memberObj,
      rawEmail: undefined,
      rawPhone: undefined,
      email: maskEmail(memberObj.email),
      phone: maskPhone(memberObj.phone),
      isMasked: true
    };
  }

  return memberObj;
}

module.exports = {
  maskEmail,
  maskPhone,
  maskMemberForRole
};

