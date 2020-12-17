const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function timeLog(req, res, next) {
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

router.post('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.components.list(req, res);
});

router.post('/data', (req, res) => {
	var myModule = new bll.module();
	myModule.components.data(req, res);
});

router.post('/share', (req, res) => {
	var myModule = new bll.module();
	myModule.components.share(req, res);
});

router.post('/update', (req, res) => {
	var myModule = new bll.module();
	myModule.components.update(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bll.module();
	myModule.components.delete(req, res);
});

router.post('/unsubscribe', (req, res) => {
	var myModule = new bll.module();
	myModule.components.unsubscribe(req, res);
});

router.post('/updatesubscriber', (req, res) => {
	var myModule = new bll.module();
	myModule.components.updatesubscriber(req, res);
});

module.exports = router;