const Q = require('q');
const chai = require('chai');
const fetch = require('node-fetch');
const subset = require('chai-subset');
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('./config.json');
chai.use(subset);

var componentId = null;

describe('components', function () {
    it('/status/components/add', function (done) {
        this.timeout(5000);

        tools.api.components.add()
            .then((result) => {
                try {
                    componentId = result.componentId;
                    result.should.have.property('componentId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/status/components/get', function (done) {
        this.timeout(5000);

        tools.api.components.get()
            .then((result) => {
                try {
                    result.should.have.property('role');
                    result.should.have.property('users');
                    result.should.have.property('serverDate');
                    result.should.have.property('componentId');
                    result.should.have.property('description');
                    result.should.have.property('organizationOnly');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/status/components/list', function (done) {
        this.timeout(5000);

        tools.api.components.list()
            .then((result) => {
                try {
                    result[0].should.have.property('role');
                    result[0].should.have.property('users');
                    result[0].should.have.property('serverDate');
                    result[0].should.have.property('componentId');
                    result[0].should.have.property('description');
                    result[0].should.have.property('organizationOnly');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/status/components/update', function (done) {
        this.timeout(5000);

        tools.api.components.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/status/components/share', function (done) {
        this.timeout(5000);

        tools.api.components.share()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/status/components/updatesubscriber', function (done) {
        this.timeout(5000);

        tools.api.components.updatesubscriber()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/status/components/unsubscribe', function (done) {
        this.timeout(5000);

        tools.api.components.unsubscribe()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Remove Added Items', function () {
    it('/status/components/delete', function (done) {
        this.timeout(5000);

        tools.api.components.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

var tools = {
    api: {
        components: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/status/components/add', {
                    'description': 'Mocha Test Report',
                    'organizationOnly': 1
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/status/components/get', {
                    'filter': [
                        'role',
                        'users',
                        'serverDate',
                        'componentId',
                        'description',
                        'organizationOnly'
                    ],
                    'componentId': componentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/status/components/list', {
                    'filter': [
                        'role',
                        'users',
                        'serverDate',
                        'componentId',
                        'description',
                        'organizationOnly'
                    ],
                    'componentId': componentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            share: () => {
                var deferred = Q.defer();

                tools.post('/status/components/share', {
                    'role': 4,
                    'email': 'shared@email.com',
                    'componentId': componentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/status/components/update', {
                    'componentId': componentId,
                    'description': 'Mocha Test Report Updated'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/status/components/delete', {
                    'componentId': componentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            unsubscribe: () => {
                var deferred = Q.defer();

                tools.post('/status/components/unsubscribe', {
                    'email': 'shared@email.com',
                    'componentId': componentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            updatesubscriber: () => {
                var deferred = Q.defer();

                tools.post('/status/components/updatesubscriber', {
                    'role': 2,
                    'email': 'shared@email.com',
                    'componentId': componentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        }
    },
    put: async (url, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'email': config.email,
            'appId': config.appId
        };

        payload = JSON.stringify(payload);

        const response = await fetch(config.status + url, {
            'headers': {
                'Accept': '*/*',
                'Referer': '127.0.0.1',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': JSON.stringify(config.token),
                'Content-Length': payload.length
            },
            'body': payload,
            'method': 'PUT'
        });

        const result = await response.json();

        deferred.resolve(result);

        return deferred.promise;
    },
    post: async (url, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'email': config.email,
            'appId': config.appId
        };

        payload = JSON.stringify(payload);

        const response = await fetch(config.status + url, {
            'headers': {
                'Accept': '*/*',
                'Referer': '127.0.0.1',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': JSON.stringify(config.token),
                'Content-Length': payload.length
            },
            'body': payload,
            'method': 'POST'
        });

        const result = await response.json();

        deferred.resolve(result);

        return deferred.promise;
    }
};