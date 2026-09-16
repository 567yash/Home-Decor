import { spawn, execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const port = process.env.PORT || '5000';
const host = '0.0.0.0';
const dbFile = path.join(__dirname, 'Json', 'user.json');

if (!fs.existsSync(dbFile)) {
  console.error(`Database file not found at: ${dbFile}`);
  process.exit(1);
}

// Dynamically resolve json-server package and binary
let binPath;
try {
  const pkgPath = require.resolve('json-server/package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const binRel = typeof pkg.bin === 'string' ? pkg.bin : (pkg.bin && pkg.bin['json-server']);
  binPath = path.resolve(path.dirname(pkgPath), binRel);
} catch {
  console.log('json-server not found. Running npm install in Backend...');
  try {
    execSync('npm install', { cwd: __dirname, stdio: 'inherit' });
    const pkgPath = require.resolve('json-server/package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const binRel = typeof pkg.bin === 'string' ? pkg.bin : (pkg.bin && pkg.bin['json-server']);
    binPath = path.resolve(path.dirname(pkgPath), binRel);
  } catch (installErr) {
    console.error('Failed to install and resolve json-server:', installErr);
    process.exit(1);
  }
}

if (!binPath || !fs.existsSync(binPath)) {
  console.error(`json-server binary could not be resolved at: ${binPath}`);
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
