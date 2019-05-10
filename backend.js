const express = require('express');
const con = require('./database')
const jwt = require('jsonwebtoken');
const keys = require('./keys')
const router = express.Router();


router.post('/login',(req,res)=>{
    var referenceid = req.body.refid;
    var lectureid = req.body.lecid;
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
                 var msg = "Login successful";
                 let token = jwt.sign({referenceid,lectureid},keys.secret);
                 res.status(200).json({token:token});
                 //console.log(msg);
             }
             else 
            {
                 res.status(401).send("failed");
                 //console.log("wrong credentials");
            }
            
        })
    }
});

module.exports = router;