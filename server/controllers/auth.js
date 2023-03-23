const Users = require('../models/users')
const { randomUUID } = require('crypto')


function isValidString(string){
  if(string==undefined || string===0){
    return true
  }else{
    return false
  }
}
exports.postSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (name == undefined || name.length===0 || email == undefined || email.length===0 || password == undefined || password.length===0) {
      return res.status(500).json({err:'Something is missing!'})
    }

    const data = await Users.create({
      id: randomUUID(),
      name: name,
      email: email,
      password: password
    })



    res.status(200).json({ user:'Successfully created user!' })

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}