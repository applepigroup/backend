const router = require('express').Router();
const jwtVerifier = require('express-jwt');
const keys = require('./keys')

router.get('/verifytoken',jwtVerifier({secret:keys.secret}),(req,res)=>
{
    console.log('token verified')
    res.status(200).end();
});
