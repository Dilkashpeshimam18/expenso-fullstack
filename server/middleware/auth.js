const jwt=require('jsonwebtoken')
const Users=require('../models/users')

const authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization')
        const user=jwt.verify(token,'shjakkajakhah') //dcrypting token
        console.log('USER!!!!>>>>>>',user)
          Users.findByPk(user.userId).then((user)=>{
            console.log(JSON.stringify(user))
            req.user=user
            next()
          }).catch((err)=>{throw new Error(err)})

    }catch(err){
        console.log(err)
        return res.status(401).json({success:false})
    }
}

module.exports={authenticate}