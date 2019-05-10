const express = require("express"); 
const mysql = require('mysql');
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken');
const keys = require('./keys')
const router = express.Router();

const app = express();

var con = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'',
    database:'students'
});

app.use(bodyparser.json());

router.post('/login',(req,res)=>{
    let referenceid = req.body.refid;
    let lectureid = req.body.lecid;
    console.log(referenceid);
    console.log(lectureid)
    if(referenceid === '' || lectureid === '')
    {
        res.send('Please Enter details to login')
    }
    else
    {
        var sqlquery = "select indexnumber from studentdetails where referenceid = ? and lectureid = ?";
        con.query(sqlquery,[referenceid,lectureid],(error,results)=>
        {
            if(error)
            {
                throw error;
                console.log("error occured");
            }
            if(results.length === 1)
            {
                 let token = jwt.sign({referenceid,lectureid},keys.secret);
                 res.status(200).json({token:token});
                 //console.log(msg);
             }
             else 
            {
                 res.status(401).send("failed");
                 //console.log("wrong credentials");
            }
            
        });
    }
});
app.listen(process.env.PORT || 4000,()=>{
    console.log("listening to port 4000")
});
