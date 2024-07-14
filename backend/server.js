const express=require('express');
const dotenv=require('dotenv').config();
const colors=require('colors');
const connectDB=require('./config/db');
const port=process.env.PORT || 1218;
connectDB();
const app=express();

const { errorHandler } = require('./middleware/errorMiddleWare');

app.use('/api/goals', require('./routes/goalRoutes'))    ;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});