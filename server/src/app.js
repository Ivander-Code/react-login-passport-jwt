'use strict'
require('./auth/auth');

const EXPRESS     = require('express'),
    SESSION       = require('express-session'),
    PASSPORT      = require('passport'),
    ROUTES        = require('./routes/userRoutes'),
    CORS          = require('cors'),
    BODY_PARSER   = require('body-parser');

//Initialization
const APP = EXPRESS();

//settings
APP.set('port',process.env.app_port || 5000);
APP.set('json spaces',2);

//middlewares
APP.use(CORS());
APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({extended:false}));
APP.use(PASSPORT.initialize());
APP.use(PASSPORT.session());

//routes
APP.use(ROUTES);

//exporting server
module.exports = APP;