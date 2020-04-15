const express = require('express');
const userRoutes = require('./user.route');

const router = express.Router();

router.get('/', function (req, res) {
  res.send('API works!');
});

router.use('/user', userRoutes);

module.exports = router;