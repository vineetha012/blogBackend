const express=require('express')
const mongoose = require('mongoose')
const cors=require('cors')
require('dotenv').config();
const login=require('./routes/login')
const register=require('./routes/rigester')
const process = require('process');
let port = process.env.PORT || 5001
let mongoUri = process.env.MONGO
const blogrouter=require('./routes/blogRoutes')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
mongoose.set('strictQuery', false)
//'mongodb://localhost/blogs_vinee'
app.get('/',async(req,res)=>{
  try {
    res.send("working successfully")
  } catch (error) {
    
  }
})
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},()=>console.log("mongo database is connected.."));
app.use('/login',login)
app.use('/register',register)
app.use('/blogs',blogrouter)
app.listen(port, () => console.log(`server is running at port ${port}....`));
