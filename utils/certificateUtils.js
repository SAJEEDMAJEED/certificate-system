const crypto = require('crypto');

function generateKeyPair() {
  try {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });

    return {
      publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }),
      privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' }),
    };
  } catch (err) {
    throw new Error('Failed to generate key pair: ' + err.message);
  }
}

function createCertificate(data, privateKey, validateMinutes) {
  if (!data || !privateKey || !validateMinutes) {
    throw new Error('Invalid input for certificate creation');
  }

  const expireAt = Date.now() + validateMinutes * 60 * 1000;
  const payload = { ...data, expireAt };

  const sign = crypto.createSign('SHA256');
  sign.update(JSON.stringify(payload));
  sign.end();

  const signature = sign.sign(privateKey, 'base64');
  return { payload, signature };
}

function validateCertificate(cert, publicKey) {
  if (!cert || !cert.payload || !cert.signature || !publicKey) {
    throw new Error('Invalid certificate or public key');
  }

  const verify = crypto.createVerify('SHA256');
  verify.update(JSON.stringify(cert.payload));
  verify.end();

  const isValid = verify.verify(publicKey, cert.signature, 'base64');
  const notExpired = Date.now() < cert.payload.expireAt;
  return isValid && notExpired;
}

module.exports = {
  generateKeyPair,
  createCertificate,
  validateCertificate,
};
