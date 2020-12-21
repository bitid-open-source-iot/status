const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function (req, res, next) {
	next();
});

router.post('/add', (req, res) => {
	var myModule = new bll.module();
	myModule.pages.add(req, res);
});

router.post('/get', (req, res) => {
	var myModule = new bll.module();
	myModule.pages.get(req, res);
});

router.put('/load', (req, res) => {
	var myModule = new bll.module();
	myModule.pages.load(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.pages.list(req, res);
});

router.post('/share', (req, res) => {
	var myModule = new bll.module();
	myModule.pages.share(req, res);
});

router.post('/update', (req, res) => {
	var myModule = new bll.module();
	myModule.pages.update(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bll.module();
	myModule.pages.delete(req, res);
});

router.post('/unsubscribe', (req, res) => {
	var myModule = new bll.module();
	myModule.pages.unsubscribe(req, res);
});

router.post('/updatesubscriber', (req, res) => {
	var myModule = new bll.module();
	myModule.pages.updatesubscriber(req, res);
});

module.exports = router;