const db = require('../db/utilities')

const findAll = async (email) => {
  const res = await db.query(
    'SELECT notes.id, notes.contents, notes.posX, notes.posY, notes.created_date, notes.modified_date ' +
      'FROM notes, users WHERE notes.user_id = users.id AND users.email=$1',
    [email]
  )
  if (process.env.DEBUG === 'true') console.log(res)
  return res.rows
}

const getNote = async (id) => {
  console.log(id)
  const res = await db.query(
    'SELECT id, contents, posX, posY, created_date, modified_date, user_id ' +
    'FROM notes WHERE id=$1',
    [id]
  )
  return res.rows.length === 1 ? res.rows[0] : null
}

const insertNote = async (note) => {
  // TODO: improve efficiency
  let res = await db.query('SELECT id FROM users WHERE email=$1', [note.email])
  const user_id = res.rows[0].id

  res = await db.query(
    'INSERT INTO notes (contents, posX, posY, created_date, modified_date, user_id) ' +
      'VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [note.contents, note.posX, note.posY, note.created_date, note.modified_date, user_id]
  )

  if (process.env.DEBUG === 'true') console.log(res)
  return res.rows[0].id // return the note id
}

const deleteNote = async (id) => {
  const res = await db.query('DELETE FROM notes WHERE id=$1', [id])
  if (process.env.DEBUG === 'true') console.log(res)
}

const updateNote = async (id, contents, posX, posY, modified_date) => {
  const res = await db.query(
    'UPDATE notes SET contents=$2, posX=$3, posY=$4, modified_date=$5 ' +
      'WHERE id=$1',
    [id, contents, posX, posY, modified_date]
  )
  if (process.env.DEBUG === 'true') console.log(res)
  return res.rows[0]
}

module.exports = {
  findAll,
  getNote,
  insertNote,
  deleteNote,
  updateNote
}
