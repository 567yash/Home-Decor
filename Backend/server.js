import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || '5000';
const host = '0.0.0.0';
const dbFile = path.join(__dirname, 'Json', 'user.json');
const binPath = path.join(__dirname, 'node_modules', 'json-server', 'lib', 'bin.js');

if (!fs.existsSync(dbFile)) {
  console.error(`Database file not found at: ${dbFile}`);
  process.exit(1);
}

if (!fs.existsSync(binPath)) {
  console.error(`json-server binary not found at: ${binPath}. Make sure to run 'npm install' first.`);
  process.exit(1);
}

console.log(`Starting json-server on http://${host}:${port} with database: ${dbFile}`);

const child = spawn(
  process.execPath,
  [binPath, '--host', host, '--port', String(port), dbFile],
  {
    stdio: 'inherit',
    env: { ...process.env, PORT: String(port), HOST: host }
  }
);

child.on('error', (err) => {
  console.error('Failed to start json-server process:', err);
  process.exit(1);
});

child.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`json-server exited with code ${code}`);
  }
  process.exit(code ?? 0);
});

// Handle termination signals gracefully
process.on('SIGINT', () => {
  child.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  child.kill('SIGTERM');
  process.exit(0);
});
