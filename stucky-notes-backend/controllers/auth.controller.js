const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { userDB } = require('../db')

const signup = async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
      signed_in_count: 0,
      last_signed_in: new Date(),
      role_name: 'user'
    }
    await userDB.insertUser(user)
  } catch (err) {
    if (process.env.DEBUG === 'true') console.log(err)
    res.status(500).send({ message: err })
  }

  const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
    expiresIn: 86400 * 14 // 2 weeks
  })

  res.status(200).send({
    email: req.body.email,
    role: 'user',
    accessToken: token
  })
}

const signin = async (req, res) => {
  try {
    const user = await userDB.getUser(req.body.email)
    if (user === null) {
      res.status(404).end()
      return
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

    if (!passwordIsValid) {
      res.status(401).send({
        accessToken: null,
        message: 'Invalid Password'
      })
      return
    }

    user.signed_in_count++
    user.last_signed_in = new Date()

    await userDB.updateUser(req.body.email, user)

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: 86400 * 14 // 2 weeks
    })

    res.status(200).send({
      email: user.email,
      signed_in_count: user.signed_in_count,
      last_signed_in: user.last_signed_in,
      role: user.role_name,
      accessToken: token
    })
  } catch (err) {
    if (process.env.DEBUG === 'true') console.log(err)
    res.status(500).send({ message: err })
  }
}

module.exports = {
  signup,
  signin
}
