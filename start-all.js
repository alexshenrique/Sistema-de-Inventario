const concurrently = require('concurrently');
const os = require('os');

const isWindows = os.platform() === 'win32';

const backendCmd = isWindows
  ? 'powershell -ExecutionPolicy Bypass -File sistema-equipamentos-novo\\start-backend.ps1'
  : 'cd sistema-equipamentos-novo && source .venv/bin/activate && python run.py';

const frontendCmd = 'cd frontend-equipamentos-vite && npm run dev';

concurrently([
  { command: backendCmd, name: 'BACKEND', prefixColor: 'blue' },
  { command: frontendCmd, name: 'FRONTEND', prefixColor: 'green' }
]); 