const Users = require('../models/users')
const { randomUUID } = require('crypto')
const bcrypt = require('bcrypt');


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

    const saltRounds = 10;
    await bcrypt.hash(password, saltRounds, async (err, hash) => {
      console.log(hash)
      const data = await Users.create({
        id: randomUUID(),
        name: name,
        email: email,
        password: hash
      })

      res.status(200).json({ success: true, user: 'Successfully created user!' })


    });


  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: err })

  }
}

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await Users.findOne({ where: { email: email } })

    if (user && password != null) {
      const userPassword = user.password

      bcrypt.compare(password, userPassword, (err, result) => {
        if (user && result == true) {
          return res.status(200).json({ data: 'User logged in successfully!' })

        } else {
          return res.status(401).json('Password donot match!')

        }
      })
    } else {
      return res.status(404).json('User not found!')

    }


  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: err })
  }
}