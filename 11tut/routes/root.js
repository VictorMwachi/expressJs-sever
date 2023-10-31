const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'));
    res.statusCode = 200;
})

router.get('/blog-post', (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','blog-post.html'));
    res.statusCode = 200;
})

router.get('/old-page',(req,res)=>{
    res.redirect(301,'./blog-post')
})


module.exports = router