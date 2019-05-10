const express = require("express"); 
const route_login = require('./login');
const route_register = require('./register');
const route_scanner = require('./scanner');
const route_verifytoken = require('./verifytoken');
const bodyparser = require('body-parser');



const app = express();
const PORT = 4000;
 
app.use(bodyparser.json());

app.use(route_login);
app.use(route_register);
app.use(route_scanner);
app.use(route_verifytoken);

app.listen(process.env.PORT || PORT ,()=>{
    console.log("listening for requests");
});
