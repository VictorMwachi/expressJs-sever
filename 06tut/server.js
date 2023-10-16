const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const {logger} = require('./middleware/logEvents');
const {errorHandler} = require('./middleware/errorHandler')


//whitelist
const whitelist = ['http://localhost:3500','http://127.0.0.1:3500']//,'https://www.google.com'];
const corsOptions = {
    origin:(origin,callback) => {
        if(whitelist.indexOf(origin)!== -1 || !origin){
            callback(null,true);
        }
        else{
            callback(new Error("Not allowed by cors"));
        }
    },
    optionsSuccessStatus:200
}

//cross origin resource sharing
app.use(cors(corsOptions));

//custom middleware for logging
app.use(logger);

//builtin mddleware to handle formdata
app.use(express.urlencoded({extended: false}))

//built in middleware for json
app.use(express.json())

//serve static files
app.use(express.static(path.join(__dirname,'public')))
app.use('subdir',express.static(path.join(__dirname,'public')))

//
app.use('/',require('./routes/root'))

//subdir folder served
app.use('/subdir',require('./routes/subdir'));


app.use('/employees',require('./routes/api/employees'));

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})