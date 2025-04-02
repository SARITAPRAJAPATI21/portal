const dotenv= require("dotenv");
dotenv.config({path:'./config.env'});
const express= require('express');
const app= express();


const PORT= process.env.PORT;

require('./db/conn');

//json -> formal form of data
app.use(express.json());
//middleware
const middleware = (req, res, next)=>{
    console.log("hello to middleware");
    next();
    }

app.use(require('./router/auth'));




app.get('/',(req, res)=>{ 
res.send(`hello world from the server app,js`);
});
app.get('/about', middleware ,(req,res)=>{
    res.send(`About section`);
    
});
app.get('/contact',(req,res)=>{
    res.send(`contact section`);
});



app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`);
})
