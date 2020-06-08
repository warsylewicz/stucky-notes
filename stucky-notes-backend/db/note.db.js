const db = require('../db/utilities')

const findAll = async email => {
  const res = await db.query(
    'SELECT notes.id, notes.contents, notes.posx, notes.posy, notes.created_date, notes.modified_date ' +
      'FROM notes, users WHERE notes.user_id = users.id AND users.email=$1',
    [email]
  )
  if (process.env.DEBUG === 'true') console.log(res)
  return res.rows
}

const getNote = async id => {
  console.log(id)
  const res = await db.query(
    'SELECT id, contents, posx, posy, created_date, modified_date, user_id ' +
      'FROM notes WHERE id=$1',
    [id]
  )
  return res.rows.length === 1 ? res.rows[0] : null
}

const insertNote = async note => {
  // TODO: improve efficiency
  let res = await db.query('SELECT id FROM users WHERE email=$1', [note.email])
  const userId = res.rows[0].id

  res = await db.query(
    'INSERT INTO notes (contents, posx, posy, created_date, modified_date, user_id) ' +
      'VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [
      note.contents,
      note.posx,
      note.posy,
      note.created_date,
      note.modified_date,
      userId
    ]
  )

  if (process.env.DEBUG === 'true') console.log(res)
  return res.rows[0].id // return the note id
}

const deleteNote = async id => {
  const res = await db.query('DELETE FROM notes WHERE id=$1', [id])
  if (process.env.DEBUG === 'true') console.log(res)
}

const updateNote = async (id, contents, posX, posY, modifiedDate) => {
  const res = await db.query(
    'UPDATE notes SET contents=$2, posx=$3, posy=$4, modified_date=$5 ' +
      'WHERE id=$1',
    [id, contents, posX, posY, modifiedDate]
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
