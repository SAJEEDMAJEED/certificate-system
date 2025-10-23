const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

for (let i = 1; i <= 10; i++) {
  router.post(`/module${i}`, apiController.handleRequest);
}

module.exports = router;
