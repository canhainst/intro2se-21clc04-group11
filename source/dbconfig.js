// const sql = require('mssql')
var config = {
  server: "localhost",
  port : 1433,
  database: process.env.DB_NAME, 
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  options: {
    enableArithAbort : true, 
    trustServerCertificate: true,
  },
  connectionTimeout: 150000, 
  pool: 
  { max : 10, min : 0, idleTimeoutMillis : 30000, },
  
};
// const sql = require('mssql')

// var config = {
//   server: "127.0.0.1", 
//   database: "BookHousess", 
//   user: 'sa',
//   password: "12345678",
//   options: {
//     trustedconnection: true,
//     enableArithAbort : true, 
//     instancename :'SQLEXPRESS'
//   },
//   port : 1433
// };

module.exports = config; 