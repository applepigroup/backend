var mysql = require('mysql');

var con = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'password',
    database:'students'
}) 

con.connect(function(err){
    if(err)
    {
        throw err;
        console.log(err);
    }
    console.log("connected");
});
module.exports = con;