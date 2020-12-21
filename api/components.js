const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function (req, res, next) {
	next();
});

router.post('/add', (req, res) => {
	var myModule = new bll.module();
	myModule.components.add(req, res);
});

router.post('/get', (req, res) => {
	var myModule = new bll.module();
	myModule.components.get(req, res);
});

router.put('/load', (req, res) => {
	var myModule = new bll.module();
	myModule.components.load(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.components.list(req, res);
});

router.post('/write', (req, res) => {
	var myModule = new bll.module();
	myModule.components.write(req, res);
});

router.post('/update', (req, res) => {
	var myModule = new bll.module();
	myModule.components.update(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bll.module();
	myModule.components.delete(req, res);
});

module.exports = router;