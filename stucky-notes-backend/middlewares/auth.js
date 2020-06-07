const jwt = require('jsonwebtoken')
const db = require('../db')

// verify the JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' })
    }
    req.email = decoded.email
    next()
  })
}

// ensure that the note id belongs to the user
const isNoteOwner = async (req, res, next) => {
  try {
    const note = await db.noteDB.getNote(req.params.id)
    const user = await db.userDB.getUser(req.email)
    console.log(note)
    console.log(user)

    if (note && user && note.user_id === user.id) {
      next()
    } else {
      res.status(403).send({ message: 'Unauthorized to access this note' })
    }
  } catch (err) {
    res.status(500).send({ message: err })
  }
}

// ensure the account is an admin
const isAdmin = async (req, res, next) => {
  try {
    console.log('here')
    const user = await db.userDB.getUser(req.email)
    console.log(user)
    if (user.role_name === 'admin') {
      next()
    } else {
      res.status(403).send({ message: 'Required admin access.' })
    }
  } catch (err) {
    res.status(500).send({ message: err })
  }
}

const auth = {
  verifyToken,
  isAdmin,
  isNoteOwner
}

module.exports = auth
