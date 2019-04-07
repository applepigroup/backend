var express = require("express"); 
var mysql = require('mysql');
var bodyparser = require('body-parser')
var app = express();

var jsonparser = bodyparser.json({type:'application/json'});

var con = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'',
    database:'students'
}) 

con.connect(function(err){
    if(err)
    {
        console.log(err);
        return;
    }
    console.log("connected");
});

app.post('/',jsonparser,(req,res)=>{
    console.log(req.body.refid);
    var referenceid=  req.body.refid;
    var lectureid = req.body.lecid;

    if(referenceid === '' || lectureid === '')
    {
        console.log("Enter details to login")
        res.send('Please Enter details to login')
    }
    else
    {
        var sqlquery = "select indexnumber from studentdetails where referenceid = ? and lectureid = ?";
        con.query(sqlquery,[referenceid,lectureid],(error,results)=>
        {
            if(error)
            {
                console.log("error occured");
            }
            else
            {
                if(results.length == 1)
                {
                    var msg = "Login successful";
                    res.send("1");
                    console.log(msg);
                }
                else 
                {
                    res.send("wrong credentials");
                    console.log("wrong credentials");
                }
            }
        })
    }
});
app.listen(3000);
