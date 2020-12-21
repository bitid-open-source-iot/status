const Q = require('q');
const fetch = require('node-fetch');
const tools = require('../lib/tools');
const dalModule = require('../dal/dal');

var module = function () {
	var bllPages = {
		add: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			tools.insertOwnerIfNoneExists(args)
				.then(dal.pages.add, null)
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
			dal.pages.get(args)
				.then(tools.setRoleObject, null)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		},

		load: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.pages.load(args)
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
			dal.pages.list(args)
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
			dal.pages.share(args)
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
			dal.pages.update(args)
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
			dal.pages.delete(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		},

		unsubscribe: (req,
			res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.pages.unsubscribe(args)
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
			dal.pages.updatesubscriber(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		}
	};

	var bllMonitor = {
		load: () => {
			var deferred = Q.defer();

			var dal = new dalModule.module();
			dal.monitor.load().then(deferred.resolve, deferred.reject);

			return deferred.promise;
		},

		async call(monitor) {
			var deferred = Q.defer();

			try {
				const start = new Date();

				const response = await fetch(monitor.request.url, {
					'body': JSON.stringify(monitor.request.body),
					'method': monitor.request.method,
					'timeout': 10000,
					'headers': monitor.request.headers
				});

				const finish = new Date();
		
				if (response.ok) {
					monitor.status = {
						'duration': finish - start,
						'responded': true
					};
					deferred.resolve(monitor);
				} else {
					monitor.status = {
						'duration': 0,
						'responded': false
					};
					deferred.resolve(monitor);
				};
			} catch (error) {
				deferred.reject(error);
			};

			return deferred.promise;
		},

		process(monitor) {
			var dal = new dalModule.module();
			monitor.date = new Date();

			this.call(monitor)
			.then(dal.monitor.write, null)
			.then(res => {
				if (typeof(__websocket.clients) != 'undefined') {
					__websocket.clients.forEach(client => {
						if (client.pageId == monitor.pageId) {
							client.send(JSON.stringify({
								'date': monitor.date,
								'pageId': monitor.pageId,
								'status': monitor.status,
								'componentId': monitor.componentId
							}));
						};
					});
				};
				__logger.info('Status Monitor Processing Complete: ' + monitor.request.url);
			}, err => {
				__logger.error('Error Processing Status Monitor');
			});
		}
	};

	var bllComponents = {
		add: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.components.add(args)
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
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		},

		load: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.components.load(args)
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
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		},

		write: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.components.write(args)
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
		}
	};

	var bllSubscribers = {
		add: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var dal = new dalModule.module();
			dal.subscribers.add(args)
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
			dal.subscribers.list(args)
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
			dal.subscribers.delete(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
		}
	};

	return {
		'pages': bllPages,
		'monitor': bllMonitor,
		'components': bllComponents,
		'subscribers': bllSubscribers
	};
};

exports.module = module;