const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const {logger} = require('./middleware/logEvents');
const {errorHandler} = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions')
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