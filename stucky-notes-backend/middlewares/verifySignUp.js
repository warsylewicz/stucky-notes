const { userDB } = require('../db')

const checkValidEmail = async (req, res, next) => {
  const email = req.body.email.trim()
  const re = /^\S+@\S+$/
  if (!re.test(email)) {
    res.status(400).send({ message: 'Failed! Invalid email address.' })
    return
  }

  try {
    const user = await userDB.getUser(email)
    if (user != null) {
      res.status(400).send({ message: 'Failed! Email is already in use.' })
      return
    }
  } catch (err) {
    if (process.env.DEBUG === 'true') console.log(err)
    res.status(500).send({ message: err })
    return
  }
  next()
}

module.exports = {
  checkValidEmail
}
