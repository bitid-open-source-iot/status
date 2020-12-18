const Q = require('q');
const db = require('../db/mongo');
const ObjectId = require('mongodb').ObjectId;
const ErrorResponse = require('../lib/error-response');

var module = function () {
	var dalPages = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'users': args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly
					}
				},
				'domain': args.req.body.domain,
				'serverDate': new Date(),
				'description': args.req.body.description
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblPages'
			})
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.pageId),
				'bitid.auth.users.email': args.req.body.header.email
			};

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter.length > 0) {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'pageId') {
						filter['_id'] = 1;
					} else if (f == 'role' || f == 'users') {
						filter['bitid.auth.users'] = 1;
					} else if (f == 'organizationOnly') {
						filter['bitid.auth.organizationOnly'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'filter': filter,
				'params': params,
				'operation': 'find',
				'collection': 'tblPages'
			})
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users.email': args.req.body.header.email
			};

			if (typeof (args.req.body.pageId) != 'undefined' && args.req.body.pageId !== null) {
				if (Array.isArray(args.req.body.pageId) && args.req.body.pageId.length > 0) {
					params._id = {
						$in: args.req.body.pageId.map(id => ObjectId(id))
					};
				} else {
					params._id = ObjectId(args.req.body.pageId);
				};
			};

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter.length > 0) {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'pageId') {
						filter['_id'] = 1;
					} else if (f == 'role' || f == 'users') {
						filter['bitid.auth.users'] = 1;
					} else if (f == 'organizationOnly') {
						filter['bitid.auth.organizationOnly'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblPages'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		share: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'bitid.auth.users.email': {
					$ne: args.req.body.email
				},
				'_id': ObjectId(args.req.body.pageId)
			};

			var update = {
				$set: {
					'serverDate': new Date()
				},
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblPages'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var update = {
				$set: {
					'serverDate': new Date()
				}
			};

			if (typeof (args.req.body.domain) != 'undefined') {
				update.$set.domain = args.req.body.domain;
			};
			if (typeof (args.req.body.description) != 'undefined') {
				update.$set.description = args.req.body.description;
			};
			if (typeof (args.req.body.organizationOnly) != 'undefined') {
				update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
			};

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.pageId)
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblPages'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': 5,
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.pageId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblPages'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.pageId),
				'bitid.auth.users.email': args.req.body.header.email
			};

			db.call({
				'filter': {},
				'params': params,
				'operation': 'find',
				'collection': 'tblPages'
			})
				.then(result => {
					var deferred = Q.defer();

					var role = 0;
					var unsubscribe = true;
					if (args.req.body.email == args.req.body.header.email) {
						result[0].bitid.auth.users.map(user => {
							if (user.email == args.req.body.header.email) {
								if (user.role == 5) {
									role = 5;
									unsubscribe = false;
								};
							};
						});
					} else {
						result[0].bitid.auth.users.map(user => {
							if (user.email == args.req.body.header.email) {
								if (user.role < 4) {
									role = user.role;
									unsubscribe = false;
								};
							};
						});
					};

					if (unsubscribe) {
						var params = {
							'_id': result[0]._id
						};
						var update = {
							$set: {
								'serverDate': new Date()
							},
							$pull: {
								'bitid.auth.users': {
									'email': args.req.body.email
								}
							}
						};
						deferred.resolve({
							'params': params,
							'update': update,
							'operation': 'update',
							'collection': 'tblPages'
						});
					} else {
						var err = new ErrorResponse();
						err.error.code = 401;
						err.error.errors[0].code = 401;
						if (role == 5) {
							err.error.errors[0].reason = 'You are the owner, you may not unsubscribe yourself!';
							err.error.errors[0].message = 'You are the owner, you may not unsubscribe yourself!';
						} else {
							err.error.errors[0].reason = 'You may not unsubscribe others!';
							err.error.errors[0].message = 'You may not unsubscribe others!';
						};
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		updatesubscriber: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.pageId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblPages'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.pageId),
						'bitid.auth.users.email': args.req.body.email
					};

					var update = {
						$set: {
							'bitid.auth.users.$.role': args.req.body.role
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblPages'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalComponents = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.pageId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'filter': filter,
				'params': params,
				'operation': 'find',
				'collection': 'tblPages'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'pageId': ObjectId(args.req.body.pageId),
						'serverDate': new Date(),
						'description': args.req.body.description
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblComponents'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 1
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.pageId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'filter': filter,
				'params': params,
				'operation': 'find',
				'collection': 'tblPages'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.componentId),
						'pageId': ObjectId(args.req.body.pageId)
					};

					var filter = {};
					if (Array.isArray(args.req.body.filter) && args.req.body.filter.length > 0) {
						filter._id = 0;
						args.req.body.filter.map(f => {
							if (f == 'componentId') {
								filter['_id'] = 1;
							} else if (f == 'role' || f == 'users') {
								filter['bitid.auth.users'] = 1;
							} else if (f == 'organizationOnly') {
								filter['bitid.auth.organizationOnly'] = 1;
							} else {
								filter[f] = 1;
							};
						});
					};

					deferred.resolve({
						'filter': filter,
						'params': params,
						'operation': 'find',
						'collection': 'tblComponents'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 1
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.pageId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'filter': filter,
				'params': params,
				'operation': 'find',
				'collection': 'tblPages'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'pageId': ObjectId(args.req.body.pageId)
					};

					if (typeof (args.req.body.componentId) != 'undefined' && args.req.body.componentId !== null) {
						if (Array.isArray(args.req.body.componentId) && args.req.body.componentId.length > 0) {
							params._id = {
								$in: args.req.body.componentId.map(id => ObjectId(id))
							};
						} else {
							params._id = ObjectId(args.req.body.componentId);
						};
					};

					var filter = {};
					if (Array.isArray(args.req.body.filter) && args.req.body.filter.length > 0) {
						filter._id = 0;
						args.req.body.filter.map(f => {
							if (f == 'componentId') {
								filter['_id'] = 1;
							} else if (f == 'role' || f == 'users') {
								filter['bitid.auth.users'] = 1;
							} else if (f == 'organizationOnly') {
								filter['bitid.auth.organizationOnly'] = 1;
							} else {
								filter[f] = 1;
							};
						});
					};

					deferred.resolve({
						'params': params,
						'filter': filter,
						'operation': 'find',
						'collection': 'tblComponents'
					})

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.pageId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'filter': filter,
				'params': params,
				'operation': 'find',
				'collection': 'tblPages'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.componentId),
						'pageId': ObjectId(args.req.body.pageId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					if (typeof (args.req.body.description) != 'undefined') {
						update.$set.description = args.req.body.description;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblComponents'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.pageId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'filter': filter,
				'params': params,
				'operation': 'find',
				'collection': 'tblPages'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.componentId),
						'pageId': ObjectId(args.req.body.pageId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblComponents'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	return {
		'pages': dalPages,
		'components': dalComponents
	};
};

exports.module = module;