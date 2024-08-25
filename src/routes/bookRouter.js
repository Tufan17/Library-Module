const { Router } = require('express');
const BookController = require('../controller/BookController');

const router = Router();

router.post('/', BookController.index);
router.post('/create', BookController.create);
router.post('/read', BookController.read);
router.post('/update', BookController.update);
router.delete('/delete', BookController.destroy);

module.exports = router;
