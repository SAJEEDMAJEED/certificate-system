const {
  generateKeyPair,
  createCertificate,
  validateCertificate,
} = require('../utils/certificateUtils');

let storedKeys = {};
let certificates = [];

exports.generateKey = (req, res, next) => {
  try {
    storedKeys = generateKeyPair();
    res.json({ message: 'Keys generated', publicKey: storedKeys.publicKey });
  } catch (err) {
    next(err);
  }
};

exports.issueCertificate = (req, res, next) => {
  try {
    const { data, validity } = req.body;
    if (!data || !validity) {
      return res.status(400).json({ error: 'Missing data or validity' });
    }

    const cert = createCertificate(data, storedKeys.privateKey, validity);
    certificates.push(cert);

    res.json({ message: 'Certificate issued', cert });
  } catch (err) {
    next(err);
  }
};

exports.verifyCertificate = (req, res, next) => {
  try {
    const { cert } = req.body;
    if (!cert) {
      return res.status(400).json({ error: 'Certificate is required' });
    }

    const isValid = validateCertificate(cert, storedKeys.publicKey);
    res.json({ valid: isValid });
  } catch (err) {
    next(err);
  }
};
