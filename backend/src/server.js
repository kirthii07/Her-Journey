require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, isDbConnected } = require('./config/db');
const { authenticate } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const programmeRoutes = require('./routes/programmeRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const communityRoutes = require('./routes/communityRoutes');
const mentorshipRoutes = require('./routes/mentorshipRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const outcomeRoutes = require('./routes/outcomeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const reviewQueueRoutes = require('./routes/reviewQueueRoutes');
const reconciliationRoutes = require('./routes/reconciliationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-role', 'x-user-id', 'x-member-id', 'x-partner-id']
}));
app.use(express.json());

// Request logging in development
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Authentication middleware (extracts JWT or headers)
app.use(authenticate);

// Health check endpoint (verifies genuine database state)
app.get('/api/health', (req, res) => {
  const connected = isDbConnected();
  if (!connected) {
    return res.status(503).json({
      status: 'unhealthy',
      api: 'running',
      database: 'disconnected',
      product: 'HerJourney API',
      timestamp: new Date().toISOString()
    });
  }

  res.status(200).json({
    status: 'healthy',
    api: 'running',
    database: 'connected',
    databaseName: 'herjourney_db',
    product: 'HerJourney API',
    tagline: 'One identity. Every chapter of your career.',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/programmes', programmeRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/mentoring', mentorshipRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/outcomes', outcomeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/review-queue', reviewQueueRoutes);
app.use('/api/reconciliation', reconciliationRoutes);

// Central Error Handler
app.use(errorHandler);

// Start Server: Connect DB first, then listen
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`URL: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start HerJourney server due to database failure:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}

module.exports = { app, start };
