const Q = require('q');
const db = require('../db/mongo');
const ObjectId = require('mongodb').ObjectId;
const ErrorResponse = require('../lib/error-response');

var module = function () {
	var dalComponents = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'users': args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly
					}
				},
				'layout': args.req.body.layout,
				'settings': args.req.body.settings,
				'serverDate': new Date(),
				'description': args.req.body.description
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblComponents'
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
				'_id': ObjectId(args.req.body.componentId),
				'bitid.auth.users.email': args.req.body.header.email
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

			db.call({
				'filter': filter,
				'params': params,
				'operation': 'find',
				'collection': 'tblComponents'
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
			
			var match = {
				'bitid.auth.users.email': args.req.body.header.email
			};

			if (typeof (args.req.body.componentId) != 'undefined') {
				if (Array.isArray(args.req.body.componentId) && args.req.body.componentId.length > 0) {
					match._id = {
						$in: args.req.body.componentId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.componentId) == 'string' && args.req.body.componentId.length == 24) {
					match._id = ObjectId(args.req.body.componentId);
				};
			};

			if (typeof (args.req.body.description) != 'undefined') {
				match.description = {
					$regex: args.req.body.description
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

			var params = [
				{
					$match: match
				},
				{
					$project: {
						'views': {
							'mobile': {
								'$size': "$layout.mobile"
							},
							'tablet': {
								'$size': "$layout.tablet"
							},
							'desktop': {
								'$size': "$layout.desktop"
							}
						},
						'_id': 1,
						'bitid': 1,
						'layout': 1,
						'settings': 1,
						'serverDate': 1,
						'description': 1
					}
				},
				{
					$project: {
						'views': {
							'mobile': {
								$cond: {
									if: {
										$gt: [ "$views.mobile", 0]
									},
									then: true,
									else: false
								}
							},
							'tablet': {
								$cond: {
									if: {
										$gt: [ "$views.tablet", 0]
									},
									then: true,
									else: false
								}
							},
							'desktop': {
								$cond: {
									if: {
										$gt: [ "$views.desktop", 0]
									},
									then: true,
									else: false
								}
							}
						},
						'_id': 1,
						'bitid': 1,
						'layout': 1,
						'settings': 1,
						'serverDate': 1,
						'description': 1
					}
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblComponents'
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
				'_id': ObjectId(args.req.body.componentId)
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
				'collection': 'tblComponents'
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
			if (typeof (args.req.body.layout) != 'undefined' && args.req.body.layout != null && args.req.body.layout != '') {
				update.$set.layout = args.req.body.layout;
			};
			if (typeof (args.req.body.settings) != 'undefined' && args.req.body.settings != null && args.req.body.settings != '') {
				update.$set.settings = args.req.body.settings;
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
				'_id': ObjectId(args.req.body.componentId)
			};

			dalComponents.audit({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblComponents'
			})
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
				'_id': ObjectId(args.req.body.componentId)
			};

			dalComponents.audit({
				'params': params,
				'operation': 'remove',
				'collection': 'tblComponents'
			})
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

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.componentId),
				'bitid.auth.users.email': args.req.body.header.email
			};

			db.call({
				'filter': {},
				'params': params,
				'operation': 'find',
				'collection': 'tblComponents'
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
							'collection': 'tblComponents'
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
				'_id': ObjectId(args.req.body.componentId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblComponents'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.componentId),
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
		'components': dalComponents
	};
};

exports.module = module;