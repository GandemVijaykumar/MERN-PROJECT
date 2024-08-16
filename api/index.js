const userRouter =  require('./routes/user.route')
const authRouter=require('./routes/auth.route')
require('dotenv').config();



const express=require('express')
const mongoose=require('mongoose');
const app=express();



app.use(express.json())
mongoose.connect(process.env.MONGO).then(()=>
    {
        console.log('Connected to MongoDB')
    }).catch((err)=>{
        console.log(err)
    })
app.listen(3000,()=>
{
    console.log("server is running at port:3000")
})
// app.get('/',(req,res)=>{
//     res.send("hello world")
// })
// instead
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)