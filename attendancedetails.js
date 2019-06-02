const express = require('express');
const con = require('./database')
const router = express.Router();

router.post('/scanner',(req,res)=>{
    let indexnumber = req.body.indexnumber;
    let qrvalue = req.body.qrvalue;
    let query1 = "SELECT studentid FROM generalstudents WHERE indexnumber = ?"

    con.query(query1,[indexnumber],(err,results)=>{
         if(err)
         {
             res.status(500).json({success:false, message:"Internal server error,please try again"});
         }
         else
         {
            if(results.length === 1)
            {
                let query2 = "INSERT INTO attendance (studentid,lessonid) VALUES (?,?)";

                con.query(query2,[results[0].studentid,qrvalue],(err)=>
                {
                    if(err)
                        res.status(500).json({success:false,message:"Internal server error,please try again"});
                    else
                    {
                        res.status(200).json({success:true,message:"attendance taken"});
                    }
                });
            }
            else
            {
                console.log("Index number incorrect")
                res.json({success:false,message:"Index number incorrect"});
            }    
        }
    });
});
module.exports = router;