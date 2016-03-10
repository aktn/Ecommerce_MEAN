var express = require('express');
var controller = require('./product.controller');
var multiparty = require('multiparty');
//var uploadOptions = { autoFile: true, uploadDir: ''}

//Routes for product
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);


module.exports = router;