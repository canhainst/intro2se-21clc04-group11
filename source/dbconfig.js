
const sql = require('mssql')

var config = {
  server: "127.0.0.1", 
  database: "BookHousess", 
  user: 'sa',
  password: "123",
  options: {
    trustedconnection: true,
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort : true, 
    instancename :'SQLEXPRESS'
  },
  port : 1433
};

module.exports = config; 