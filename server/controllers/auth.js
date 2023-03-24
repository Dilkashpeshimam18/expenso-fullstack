const Users = require('../models/users')
const { randomUUID } = require('crypto')


function isValidString(string) {
  if (string == undefined || string === 0) {
    return true
  } else {
    return false
  }
}

exports.postSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (name == undefined || name.length === 0 || email == undefined || email.length === 0 || password == undefined || password.length === 0) {
      return res.status(500).json({ err: 'Something is missing!' })
    }

    const data = await Users.create({
      id: randomUUID(),
      name: name,
      email: email,
      password: password
    })



    res.status(200).json({ user: 'Successfully created user!' })

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await Users.findOne({ where: { email: email } })

    if (user && user.password == password) {
      res.status(200).json({ data: 'User logged in successfully!' })
    } else if (user && user.password != password) {
      res.status(401).json('Password donot match!')

    } else {
      res.status(404).json('User not found!')

    }



  } catch (err) {
    console.log(err)

  }
}