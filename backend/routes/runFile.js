const express = require('express');
const router = express.Router();

router.post('/',require('../controllers/runFile'));

module.exports = router;