import { pool } from '../../db.js'

const getNotasById = async (id) => {
  const [data] = await pool.query('SELECT * FROM nota WHERE idPedido=?;', [id])
  return data
}

const createNota = async (idPedido, nota) => {
  const newNota = {
    idPedido,
    nota
  }
  const [data] = await pool.query('INSERT INTO nota SET ?', [newNota])
  return data
}

const deleteNota = async (id) => {
  const [data] = await pool.query('DELETE FROM nota WHERE idPedido=?;', [id])
  return data
}

export default {
  getNotasById,
  createNota,
  deleteNota
}
