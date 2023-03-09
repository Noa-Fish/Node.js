const express = require('express');
const router = express.Router();
const { createUser,findUser,getAllUsers,getAllWatchlist,updateUser} = require('../controllers/users');

router.post('/create', createUser);
router.get('/find/:name', findUser);
router.get('/getallusers', getAllUsers);
router.get('/getwatchlists/:name', getAllWatchlist);
router.post('/update/name/:name', updateUser);





module.exports = router;

