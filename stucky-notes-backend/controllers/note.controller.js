const { noteDB } = require('../db')

const findAll = async (req, res) => {
  try {
    const notes = await noteDB.findAll(req.email)
    res.send(notes)
  } catch (err) {
    res.status(500).send({ message: err })
  }
}

const insertNote = async (req, res) => {
  try {
    const note = {
      contents: req.body.contents,
      posX: req.body.posX,
      posY: parseInt(req.body.posY),
      created_date: new Date().toISOString(),
      modified_date: new Date().toISOString(),
      email: req.email
    }

    const id = await noteDB.insertNote(note)
    note.id = id

    res.send(note)
  } catch (err) {
    console.log(err.stack)
    res.status(500).send({ message: err })
  }
}

const updateNote = async (req, res) => {
  try {
    const note = await noteDB.updateNote(
      req.params.id,
      req.body.contents,
      req.body.posX,
      req.body.posY,
      new Date().toISOString()
    )
    res.send(note)
  } catch (err) {
    res.status(500).send({ message: err })
  }
}

const deleteNote = async (req, res) => {
  try {
    await noteDB.deleteNote(req.params.id)
    res.status(200).send()
  } catch (err) {
    res.status(500).send({ message: err })
  }
}

module.exports = {
  findAll,
  insertNote,
  updateNote,
  deleteNote
}
