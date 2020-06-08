'use strict';

require('dotenv').config();
require('./src/db/database');
const APP = require('./src/app.js');

/** Starting Server */
(() => {
  APP.listen(APP.get('port'), () => {
    console.log('Server on Port ', APP.get('port'));
  });
})();
