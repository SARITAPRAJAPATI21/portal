const dotenv= require("dotenv");
dotenv.config({path:'./config.env'});
const express= require('express');
const cors =require('cors')
const app= express();


const PORT= process.env.PORT;

require('./db/conn');

//json -> formal form of data
app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URL
}))



app.use(require('./router/auth'));




app.get('/',(req, res)=>{ 
res.send(`hello world from the server app,js`);
});


app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`);
})
