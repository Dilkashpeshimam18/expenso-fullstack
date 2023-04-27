exports.addIncome=async(req,res)=>{
    try{

        const {income}=req.body
        const id=req.user.id
        console.log('USERR ID>>>>>',id)
        await req.user.update({total_income:income})
        res.status(200).json({message:'Added Income Successfully'})

    }catch(err){
        console.log(err)
        return res.status(403).json({ err, success: false })

    }
}

exports.getUserDetail=async(req,res)=>{
  try{
   const user=req.user
   console.log('USER DETAIL>>>',user)
   const data={
    total_income:user.total_income,
    total_expense:user.total_expense,
    remaining_balance:user.remaining_balance
   }
   res.status(200).json({message:data})
  }catch(err){
    console.log(err)
    return res.status(403).json({ err, success: false })

  }
}