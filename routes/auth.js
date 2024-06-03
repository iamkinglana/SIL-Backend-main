const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister } = require('../validators/validateMiddleware');

router.post('/register', validateRegister, authController.register);
router.post('/login', authController.login);

module.exports = router;
