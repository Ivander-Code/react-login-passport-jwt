'use strict'
const MONGOOSE = require('mongoose');
var connection;

MONGOOSE.connect(process.env.db_uri,{
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology:true
});

connection = MONGOOSE.connection;
connection.on('error',console.error.bind(console,'connection error:'));
connection.once('open',()=>{
    console.log('Successful DB connection');
});

