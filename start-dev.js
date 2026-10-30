const { spawn } = require('child_process');
const path = require('path');

console.log('=======================================================');
console.log('  Starting HerJourney Full-Stack Development Services');
console.log('  One identity. Every chapter of your career.');
console.log('=======================================================');

// 1. Start Backend
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// 2. Start Frontend
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

function cleanup() {
  console.log('\nStopping HerJourney dev servers...');
  backend.kill();
  frontend.kill();
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

