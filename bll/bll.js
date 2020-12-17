const tools = require('../lib/tools');
const dalModule = require('../dal/dal');

var module = function () {
	var bllComponents = {
		add: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			tools.insertOwnerIfNoneExists(args)
				.then(dal.components.add, null)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		},

		get: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.components.get(args)
				.then(tools.setRoleObject, null)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		},

		list: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.components.list(args)
				.then(tools.setRoleList, null)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		},

		share: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.components.share(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		},

		update: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.components.update(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		},

		delete: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.components.delete(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		},

		unsubscribe: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.components.unsubscribe(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		},

		updatesubscriber: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.components.updatesubscriber(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		}
	};

	return {
		'components': bllComponents
	};
};

exports.module = module;