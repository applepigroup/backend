const express = require("express");
const con = require('./database')
const bcrypt = require('bcrypt')
const router = express.Router();

let saltrounds = 10;

router.post('/lecturerregister',(req,res)=>{
    let username = req.body.user;
    let password = req.body.pass;
    let coursecode = req.body.ccode;

    if(username === '' || password ==='' || coursecode ==='')
    {
        res.send("Complete all fields");
    }
    else
    {
        query_reg1 = "select username , coursecode from lecturerdetails where username = ? or coursecode = ?";
        con.query(query_reg1,[username,coursecode],(error,results)=>{
            if(error)
            {
                throw error;
            }
            if(results.length === 1)
            {
                if(results[0].username === username || results[0].coursecode === coursecode);
                {
                    res.send("The username or course code already exist.");
                }
            }
            else if(results.length === 0){
                bcrypt.hash(password,saltrounds,(error,hashedpassword)=>
                {
                    query_reg2 = "insert into lecturerdetails (username,password,coursecode) values (?,?,?)";
                    con.query(query_reg2,[username,hashedpassword,coursecode],(error)=>{
                    if(error)
                    {
                        console.log(error);
                        return;
                    }
                    console.log("you have successfully registered as a lecturer");
                    res.sendStatus(200);
                    
                  })
                });
                
            }
        })
    }
})
module.exports = router;