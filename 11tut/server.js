const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const {errorHandler} = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const { verifyJWT } = require('./middleware/verifyJwt')
const cookieParser = require('cookie-parser');


const PORT = process.env.PORT || 3500;

//cross origin resource sharing
app.use(cors(corsOptions));

//custom middleware for logging
app.use(logger);

//builtin mddleware to handle formdata
app.use(express.urlencoded({extended: false}));

//built in middleware for json
app.use(express.json());
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname,'public')))
app.use('subdir',express.static(path.join(__dirname,'public')))

//
app.use('/',require('./routes/root'))
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logout'));

//subdir folder served
app.use('/subdir',require('./routes/subdir'));

app.use(verifyJWT);
app.use('/employees',require('./routes/api/employees'));

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})