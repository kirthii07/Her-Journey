require('dotenv').config();
const { connectDB, disconnectDB } = require('./db');
const { seedDatabase } = require('./seedData');

async function run() {
  await connectDB();
  await seedDatabase();
  console.log('Seed runner completed successfully.');
  await disconnectDB();
  process.exit(0);
}

run().catch(err => {
  console.error('Seed runner failed:', err);
  process.exit(1);
});

