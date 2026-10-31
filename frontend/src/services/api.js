const RAW_API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Normalizes API base URL and endpoint to prevent duplicate slashes,
 * missing /api segments, or accidental /api/api/... double prefixes.
 */
function buildApiUrl(base, endpoint) {
  let cleanBase = (base || '/api').trim().replace(/\/+$/, '');
  if (cleanBase.startsWith('http') && !cleanBase.endsWith('/api')) {
    cleanBase = `${cleanBase}/api`;
  }
  let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (cleanBase.endsWith('/api') && cleanEndpoint.startsWith('/api/')) {
    cleanEndpoint = cleanEndpoint.slice(4);
  }
  return `${cleanBase}${cleanEndpoint}`;
}

/**
 * Fetch wrapper that attaches JWT Bearer token & role identity headers
 */
async function apiRequest(endpoint, method = 'GET', body = null, customHeaders = {}) {
  const savedUser = JSON.parse(localStorage.getItem('herjourney_user') || '{}');
  const token = localStorage.getItem('herjourney_token') || '';
  const role = savedUser.role || 'MEMBER';
  const userId = savedUser.id || savedUser.memberId || savedUser.partnerId || '';
  const memberId = savedUser.memberId || (role === 'MEMBER' ? userId : '');
  const partnerId = savedUser.partnerId || (role === 'PARTNER' ? userId : '');

  const headers = {
    'Content-Type': 'application/json',
    'x-user-role': role,
    'x-user-id': userId,
    'x-member-id': memberId,
    'x-partner-id': partnerId,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...customHeaders
  };

  const config = {
    method,
    headers
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const url = buildApiUrl(RAW_API_BASE, endpoint);
  const response = await fetch(url, config);

  // Safe parse: handle HTML error pages from CDN/proxy (e.g. Render cold-start 503)
  const contentType = response.headers.get('content-type') || '';
  let json;
  if (contentType.includes('application/json')) {
    json = await response.json();
  } else {
    const text = await response.text();
    throw new Error(`Server returned non-JSON response (${response.status}): ${text.substring(0, 120)}`);
  }

  if (!response.ok) {
    throw new Error(json.message || json.error || `API error: ${response.status}`);
  }

  return json.data !== undefined ? json.data : json;
}

export const api = {
  // Health
  getHealth: () => apiRequest('/health'),

  // Auth
  login: (email, password) => apiRequest('/auth/login', 'POST', { email, password }),
  demoLogin: (email, role, memberKey) => apiRequest('/auth/demo-login', 'POST', { email, role, memberKey }),
  getMe: () => apiRequest('/auth/me'),
  getDemoProfiles: () => apiRequest('/auth/demo-profiles'),

  // Member
  getMembers: (params = '') => apiRequest(`/members${params ? `?${params}` : ''}`),
  getMemberById: (id) => apiRequest(`/members/${id}`),
  updateMember: (id, updates) => apiRequest(`/members/${id}`, 'PUT', updates),
  checkDuplicate: (data) => apiRequest('/members/check-duplicate', 'POST', data),

  // Programmes
  getProgrammes: () => apiRequest('/programmes'),
  getProgrammeById: (id) => apiRequest(`/programmes/${id}`),
  createProgramme: (data) => apiRequest('/programmes', 'POST', data),
  updateProgramme: (id, data) => apiRequest(`/programmes/${id}`, 'PUT', data),
  getEligibleMembers: (programmeId) => apiRequest(`/programmes/${programmeId}/eligible-members`),
  inviteMember: (programmeId, memberId) => apiRequest(`/programmes/${programmeId}/invite`, 'POST', { memberId }),

  // Applications
  getApplications: (params = '') => apiRequest(`/applications${params ? `?${params}` : ''}`),
  getApplicationById: (id) => apiRequest(`/applications/${id}`),
  registerForProgramme: (programmeId, memberId) => apiRequest('/applications', 'POST', { programmeId, memberId }),
  updateStage: (applicationId, stage, notes = '') => apiRequest(`/applications/${applicationId}/stage`, 'PUT', { stage, notes }),
  updateAttendance: (applicationId, sessionNumber, present) => apiRequest(`/applications/${applicationId}/attendance`, 'PUT', { sessionNumber, present }),
  markHired: (applicationId, placedRole, placedCompany) => apiRequest(`/applications/${applicationId}/hire`, 'PUT', { placedRole, placedCompany }),

  // Certificates
  issueCertificate: (memberId, programmeId, skillsEndorsed) => apiRequest('/certificates', 'POST', { memberId, programmeId, skillsEndorsed }),
  getMemberCertificates: (memberId) => apiRequest(`/certificates/member/${memberId}`),

  // Communities
  getCommunities: () => apiRequest('/communities'),
  joinCommunity: (communityId, memberId) => apiRequest(`/communities/${communityId}/join`, 'POST', { memberId }),
  leaveCommunity: (communityId, memberId) => apiRequest(`/communities/${communityId}/leave`, 'POST', { memberId }),

  // Mentorship
  getMentorship: (memberId) => apiRequest(`/mentoring/member/${memberId}`),

  // Opportunities
  getOpportunities: (memberId) => apiRequest(`/opportunities/member/${memberId}`),

  // Outcomes
  reportOutcome: (data) => apiRequest('/outcomes', 'POST', data),
  getOutcomes: (params = '') => apiRequest(`/outcomes${params ? `?${params}` : ''}`),
  verifyOutcome: (id, verifiedBy = '', notes = '') => apiRequest(`/outcomes/${id}/verify`, 'PUT', { verifiedBy, notes }),

  // Dashboards
  getMemberDashboard: (memberId) => apiRequest(`/dashboard/member/${memberId}`),
  getManagerDashboard: () => apiRequest('/dashboard/manager'),
  getPartnerDashboard: (partnerId) => apiRequest(`/dashboard/partner/${partnerId}`),

  // Duplicate Review & Reconciliation
  getReviewQueue: () => apiRequest('/review-queue'),
  resolveReviewQueue: (id, decision, resolutionNotes = '', updatedData = null) => apiRequest(`/review-queue/${id}`, 'PUT', { decision, resolutionNotes, updatedData }),
  previewReconciliation: (rows = []) => apiRequest('/reconciliation/preview-csv', 'POST', { rows })
};
