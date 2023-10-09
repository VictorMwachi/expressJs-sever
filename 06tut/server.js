const Express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const http = require("http");


app.get('/', (req,res)=>{
    res.send("Hello world");
    res.statusCode = 200;
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})