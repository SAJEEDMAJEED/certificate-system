const { canAccess, logAccess } = require('./accessController');

exports.handleRequest = (req, res, next) => {
  try {
    const { user, module } = req.body;

    if (!user || !module) {
      return res.status(400).json({ error: 'Missing user or module' });
    }

    if (!canAccess(user, module)) {
      logAccess(user, module, 'DENIED');
      return res.status(403).json({ message: 'Access Denied' });
    }

    logAccess(user, module, 'ALLOWED');
    res.json({ message: `Access granted to ${module}` });
  } catch (err) {
    next(err);
  }
};
