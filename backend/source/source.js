import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from '../utilities/route/user.route.js';
const app=express();

app.use(cors());
app.use(express.json());

app.use('/user',router);
app.use((req,res)=>{
    res.status(200).json({message:"API is working"})
})
app.listen(3000,()=>{
  console.log("Server started on port 3000");
});