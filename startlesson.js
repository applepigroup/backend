const router = require('express').Router();
const conn = require('./database');

router.post('/startlesson',(req,res)=>
{
   let coursecode =  req.body.coursecode;
   let username = req.body.username;
   console.log(coursecode)
   console.log(username)

   let sqlquery = "SELECT lecturerid FROM lecturerdetails WHERE username = ?";
   conn.query(sqlquery,[username],(error,results)=>
   {
       console.log(results)
       if(error)
       {
           res.status(500).send("Internal server error, please try again");
       }
       else
       {
           if(results.length === 1)
           {
               let lecturerid = results[0].lecturerid;
               
               let sqlquery2 = "SELECT courseid FROM course WHERE coursecode = ?";
               conn.query(sqlquery2,[coursecode+lecturerid],(error,results)=>
               {
                console.log("courseid",results);
                   if(error)
                   {
                     res.status(500).send("Internal server error, please try again");
                   }
                   else
                   {
                       if(results.length === 1)
                       {
                           let courseid = results[0].courseid
                           console.log("hey",courseid);
                           let sqlquery1 = "INSERT INTO lesson (lessonid,courseid,lecturerid) VALUES (UUID(),?,?)";
                            conn.query(sqlquery1,[courseid,lecturerid],error =>
                            {
                                if(error)
                                {
                                    res.status(500).send("Internal server error, Please try again");
                                }
                                else
                                {
                                    res.status(200).send("Lesson started successfully");
                                }
                            });
                        }
                        else
                        {
                            res.send("Please create a course before starting a lesson");
                        }
                    }
                });
            }
        }
    });       
});

module.exports = router;