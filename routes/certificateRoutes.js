const express = require('express');
const router = express.Router();
const certController = require('../controllers/certificateController');

router.get('/generate-key', certController.generateKey);
router.post('/issue', certController.issueCertificate);
router.post('/verify', certController.verifyCertificate);

module.exports = router;
