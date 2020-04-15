const express = require('express');
const UserCtrl = require('../controllers/user.controller');
const router = express.Router();
router.get('/', UserCtrl.list);
router.get('/:id', UserCtrl.get);
router.post('/register/', UserCtrl.create);
router.put('/:id', UserCtrl.update);
router.delete('/:id', UserCtrl.delete);
module.exports = router;