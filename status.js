const Q = require('q');
const db = require('./db/mongo');
const bll = require('./bll/bll');
const cors = require('cors');
const http = require('http');
const auth = require('./lib/auth');
const chalk = require('chalk');
const parser = require('body-parser');
const express = require('express');
const responder = require('./lib/responder');
const ErrorResponse = require('./lib/error-response');
const { setTimeout } = require('timers');

global.__base = __dirname + '/';
global.__logger = require('./lib/logger');
global.__settings = require('./config.json');
global.__responder = new responder.module();
global.__monitoring = [];

try {
    var portal = {
        api: (args) => {
            var deferred = Q.defer();

            try {
                var app = express();
                app.use(cors());
                app.use(parser.urlencoded({
                    'limit': '50mb',
                    'extended': true,
                    'parameterLimit': 50000
                }));
                app.use(parser.json({
                    'limit': '50mb'
                }));

                if (args.settings.authentication) {
                    app.use((req, res, next) => {
                        if (req.method != 'GET' && req.method != 'PUT') {
                            auth.authenticate({
                                'req': req,
                                'res': res
                            })
                                .then(result => {
                                    next();
                                }, err => {
                                    __responder.error(req, res, err);
                                });
                        } else {
                            next();
                        };
                    });
                };

                app.use('/', express.static(__dirname + '/app/dist/status'));
                app.get('/*', (req, res) => {
                    res.sendFile(__dirname + '/app/dist/status/index.html');
                });

                var pages = require('./api/pages');
                app.use('/status/pages', pages);
                __logger.info('Loaded: /status/pages');

                var components = require('./api/components');
                app.use('/status/components', components);
                __logger.info('Loaded: /status/components');

                app.use((error, req, res, next) => {
                    var err = new ErrorResponse();
                    err.error.code = 500;
                    err.error.message = error.message;
                    err.error.errors[0].code = 500;
                    err.error.errors[0].message = error.message;
                    err.hiddenErrors.push(err.stack);
                    __responder.error(req, res, err);
                });

                var server = http.createServer(app);
                server.listen(args.settings.localwebserver.port);

                deferred.resolve(args);
            } catch (e) {
                __logger.error('initAPI catch error: ' + e);
                deferred.reject(e)
            };

            return deferred.promise;
        },

        init: (args) => {
            if (!args.settings.production || !args.settings.authentication) {
                var index = 0;
                console.log('');
                console.log('=======================');
                console.log('');
                console.log(chalk.yellow('Warning: '));
                if (!args.settings.production) {
                    index++;
                    console.log('');
                    console.log(chalk.yellow(index + ': You are running in ') + chalk.red('"Development Mode!"') + chalk.yellow(' This can cause issues if this environment is a production environment!'));
                    console.log('');
                    console.log(chalk.yellow('To enable production mode, set the ') + chalk.bold(chalk.green('production')) + chalk.yellow(' variable in the config to ') + chalk.bold(chalk.green('true')) + chalk.yellow('!'));
                };
                if (!args.settings.authentication) {
                    index++;
                    console.log('');
                    console.log(chalk.yellow(index + ': Authentication is not enabled ') + chalk.yellow(' This can cause issues if this environment is a production environment!'));
                    console.log('');
                    console.log(chalk.yellow('To enable Authentication mode, set the ') + chalk.bold(chalk.green('authentication')) + chalk.yellow(' variable in the config to ') + chalk.bold(chalk.green('true')) + chalk.yellow('!'));
                };
                console.log('');
                console.log('=======================');
                console.log('');
            };

            portal.logger(args)
                .then(portal.api, null)
                .then(portal.database, null)
                .then(portal.startwatching, null)
                .then(args => {
                    console.log('Webserver Running on port: ', args.settings.localwebserver.port);
                }, err => {
                    console.log('Error Initializing: ', err);
                });
        },

        logger: (args) => {
            var deferred = Q.defer();

            __logger.init();
            deferred.resolve(args);

            return deferred.promise;
        },

        database: (args) => {
            var deferred = Q.defer();

            db.connect().then(connection => {
                global.__database = connection;
                deferred.resolve(args);
            }, err => {
                __logger.log('Database Connection Error: ' + err);
                deferred.reject(err);
            });

            return deferred.promise;
        },

        startwatching: (args) => {
            var deferred = Q.defer();
            
            try {
                var bllModule = new bll.module();
                bllModule.monitor.load()
                .then(monitoring => {
                    __monitoring = monitoring;
                    __monitoring.map(monitor => bllModule.monitor.process(monitor));
                    setInterval(() => {
                        __monitoring.map(monitor => bllModule.monitor.process(monitor));
                    }, 1 * 60 * 1000);
                }, err => {
                    __logger.error(err.message);
                });

                deferred.resolve(args);
            } catch (error) {
                deferred.reject(error.message);
            };

            return deferred.promise;
        }
    };

    portal.init({
        'settings': __settings
    });
} catch (error) {
    console.log('The following error has occurred: ', error.message);
};

exports.module = module;