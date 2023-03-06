const express = require('express');
const router = express.Router();
const { createItem, findItem } = require('../controllers/items');

router.post('/create', createItem);
router.get('/find', findItem);

module.exports = router;

