const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function (req, res, next) {
	next();
});

router.post('/add', (req, res) => {
	var myModule = new bll.module();
	myModule.subscribers.add(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.subscribers.list(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bll.module();
	myModule.subscribers.delete(req, res);
});

module.exports = router;