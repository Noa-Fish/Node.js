const express = require('express');
const router = express.Router();
const { createItem, findItem , updateItem,addWatchlist} = require('../controllers/items');

router.post('/create', createItem);
router.get('/find/:title', findItem);
router.post('/update/etat/:title', updateItem);
router.post('/add/watchlist/:name', addWatchlist);



module.exports = router;

