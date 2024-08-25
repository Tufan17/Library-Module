const { Router } = require('express');
const UserController = require('../controller/UserController');

const router = Router();

router.post('/', UserController.index);
router.post('/create', UserController.create);
router.post('/read', UserController.read);
router.post('/update', UserController.update);
router.delete('/delete', UserController.destroy);

module.exports = router;
