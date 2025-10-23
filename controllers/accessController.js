const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, '../logs/apiLogs.txt');

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
