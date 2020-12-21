const Q = require('q');
const ErrorResponse = require('./error-response');

var module = function () {
	var responder = {
		response: {
			update(result) {
				var deferred = Q.defer();

				deferred.resolve({
					'updated': result.n
				});

				return deferred.promise;
			},

			delete(result) {
				var deferred = Q.defer();

				deferred.resolve({
					'deleted': result.n
				});

				return deferred.promise;
			},

			pages: {
				add(result) {
					var deferred = Q.defer();

					deferred.resolve({
						'pageId': result._id
					});

					return deferred.promise;
				},

				get(result) {
					var deferred = Q.defer();

					var tmp = {
						'role': result.role,
						'pageId': result._id,
						'domain': result.domain,
						'serverDate': result.serverDate,
						'description': result.description
					};

					if (typeof (result.bitid) != "undefined") {
						if (typeof (result.bitid.auth) != "undefined") {
							tmp.users = result.bitid.auth.users;
							tmp.organizationOnly = result.bitid.auth.organizationOnly;
						};
					};

					deferred.resolve(tmp);

					return deferred.promise;
				},

				load(result) {
					var deferred = Q.defer();

					deferred.resolve({
						'pageId': result._id,
						'description': result.description
					});

					return deferred.promise;
				},

				list(result) {
					var deferred = Q.defer();

					result = result.map(obj => {
						var tmp = {
							'role': obj.role,
							'pageId': obj._id,
							'domain': obj.domain,
							'serverDate': obj.serverDate,
							'description': obj.description
						};

						if (typeof (obj.bitid) != "undefined") {
							if (typeof (obj.bitid.auth) != "undefined") {
								tmp.users = obj.bitid.auth.users;
								tmp.organizationOnly = obj.bitid.auth.organizationOnly;
							};
						};

						return tmp;
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			components: {
				add(result) {
					var deferred = Q.defer();

					deferred.resolve({
						'componentId': result._id
					});

					return deferred.promise;
				},

				get(result) {
					var deferred = Q.defer();

					var tmp = {
						'role': result.role,
						'pageId': result.pageId,
						'serverDate': result.serverDate,
						'componentId': result._id,
						'description': result.description
					};

					deferred.resolve(tmp);

					return deferred.promise;
				},

				load(result) {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'status': obj.status,
							'pageId': obj.pageId,
							'description': obj.description,
							'componentId': obj.componentId
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				},

				list(result) {
					var deferred = Q.defer();

					result = result.map(obj => {
						var tmp = {
							'role': obj.role,
							'pageId': obj.pageId,
							'serverDate': obj.serverDate,
							'componentId': obj._id,
							'description': obj.description
						};

						return tmp;
					});

					deferred.resolve(result);

					return deferred.promise;
				},

				write(result) {
					var deferred = Q.defer();

					deferred.resolve({
						'historicalId': result._id
					});

					return deferred.promise;
				}
			},

			subscribers: {
				add(result) {
					var deferred = Q.defer();

					deferred.resolve({
						'subscriberId': result._id
					});

					return deferred.promise;
				},

				list(result) {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'email': obj.email,
							'pageId': obj.pageId,
							'subscriberId': obj._id
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			}
		},

		model: (req, result) => {
			var deferred = Q.defer();

			switch (req.originalUrl) {
				case ('*'):
					deferred.resolve(result);
					break;

				case ('/status/pages/add'):
					responder.response.pages.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/status/pages/get'):
					responder.response.pages.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/status/pages/load'):
					responder.response.pages.load(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/status/pages/list'):
					responder.response.pages.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/status/components/add'):
					responder.response.components.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/status/components/get'):
					responder.response.components.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/status/components/load'):
					responder.response.components.load(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/status/components/list'):
					responder.response.components.list(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/status/components/write'):
					responder.response.components.write(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/status/subscribers/add'):
					responder.response.subscribers.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/status/subscribers/list'):
					responder.response.subscribers.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/status/pages/share'):

				case ('/status/pages/update'):
				case ('/status/components/update'):

				case ('/status/pages/unsubscribe'):

				case ('/status/pages/updatesubscriber'):
					responder.response.update(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/status/pages/delete'):
				case ('/status/components/delete'):
				case ('/status/subscribers/delete'):
					responder.response.delete(result).then(deferred.resolve, deferred.reject);
					break;

				default:
					deferred.resolve({
						'success': 'Your request resolved successfully but this payload is not modeled!'
					});
					break;
			};

			return deferred.promise;
		},

		error: (req, res, err) => {
			if (typeof (err) == 'object') {
				try {
					__logger.error(JSON.stringify(err));
				} catch (e) {
					__logger.error('Skipped writing an Error. Could not stringify the err object');
				};
			} else {
				__logger.error(err);
			};

			res.status(err.error.code).json(err.error);
		},

		success: (req, res, result) => {
			responder.model(req, result)
				.then(result => {
					res.json(result);
				}, error => {
					var err = new ErrorResponse();
					err.error.code = 401;
					err.error.message = error.message;
					responder.error(req, res, err);
				});
		}
	};

	return responder;
};

exports.module = module;