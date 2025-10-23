const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
const logPath = path.join(logDir, 'apiLogs.txt');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const userAccess = {
  user1: ['module1', 'module2'],
  user2: ['module2', 'module3'],
};

function canAccess(user, module) {
  const allowedModules = userAccess[user] || [];
  return allowedModules.includes(module);
}

function logAccess(user, module, status) {
  const log = `${new Date().toISOString()} | ${user} | ${module} | ${status}\n`;
  fs.appendFileSync(logPath, log, 'utf8');
}

module.exports = { canAccess, logAccess };
