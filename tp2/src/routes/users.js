const express = require('express');
const router = express.Router();
const { createUser,findUserWithId } = require('../controllers/users');

router.post('/create', createUser);
router.get('/find', findUserWithId);

module.exports = router;

