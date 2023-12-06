

const sql = require('mssql')

var config = {
  server: "127.0.0.1", 
  database: "book_house", 
  user: 'sa',
  password: "123",
  options: {
    trustedconnection: true,
    enableArithAbort : true, 
    instancename :'SQLEXPRESS'
  },
  port : 1433
};

module.exports = config; 