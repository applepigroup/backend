 var express = require("express"); 
var mysql = require('mysql');
var bodyparser = require('body-parser')
var router = express.Router();
var app = express();

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
        throw err;
    }
    console.log("connected");
});

app.use(bodyparser.json());
app.use(router);

router.post('/',(req,res)=>{
    
    const{referenceid,lectureid} = req.body;
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
                throw error;
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
app.listen(process.env.PORT || 4000,()=>{
    console.log("listening to port 4000")
});
