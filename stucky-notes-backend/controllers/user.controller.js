const { userDB } = require('../db')

const findAll = async (req, res) => {
  try {
    const users = await userDB.findAll()
    res.send(users)
  } catch (err) {
    res.status(500).send({ message: err })
  }
}

const deleteUser = async (req, res) => {
  try {
    await userDB.deleteUser(req.params.email)
    res.status(200).end()
  } catch (err) {
    res.status(500).send({ message: err })
  }
}

module.exports = {
  findAll,
  deleteUser
}
