const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const authRoutes=require('./routes/auth')
const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use(authRoutes)


app.listen(4000,()=>{
    console.log('SERVER RUNNING!!')
})