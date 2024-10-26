import { pool } from '../../db.js'

const getAllClientes = async () => {
  const [data] = await pool.query('SELECT * FROM cliente')
  return data
}

const createCliente = async (cliente) => {
  const { id, idCliente, nombre, telefono, email, direccion } = cliente

  const newCliente = {
    id,
    idCliente,
    nombre,
    telefono,
    email,
    direccion
  }

  const [data] = await pool.query('INSERT INTO cliente SET ?', [newCliente])
  return data
}

const getNewIdCliente = async () => {
  const [data] = await pool.query('SELECT id FROM cliente ORDER BY cliente.id DESC LIMIT 1;')
  if (data.length === 0) {
    return 'CL-00000001'
  } else {
    return `CL-${(data[0].id + 1).toString().padStart(8, '0')}`
  }
}

const getNewId = async () => {
  const [data] = await pool.query('SELECT id FROM cliente ORDER BY cliente.id DESC LIMIT 1;')
  if (data.length === 0) {
    return 1
  } else {
    return data[0].id + 1
  }
}

const updateCliente = async (id, cliente) => {
  console.log(cliente)
  const { idCliente, nombre, telefono, email, direccion } = cliente
  const [data] = await pool.query('UPDATE cliente SET idCliente = IFNULL(?, idCliente), nombre = IFNULL(?, nombre), telefono = IFNULL(?, telefono), email = IFNULL(?, email), direccion = IFNULL(?, direccion) WHERE id = ?', [idCliente, nombre, telefono, email, direccion, id])
  return data
}

const deleteCliente = async (id) => {
  const [data] = await pool.query('DELETE FROM cliente WHERE idCliente = ?', [id])
  return data
}

const getIdCliente = async (id) => {
  const [data] = await pool.query('SELECT idCliente FROM cliente WHERE id = ?', [id])
  return data[0].idCliente
}

const updateClienteIdInPedido = async (id, idCliente) => {
  // No sirve
  const pastId = await getIdCliente(id)
  console.log(pastId)
  const [data] = await pool.query('UPDATE pedido SET idCliente = ? WHERE idCliente = ?', [idCliente, pastId])
  return data
}

export default {
  getAllClientes,
  createCliente,
  updateCliente,
  deleteCliente,
  getNewIdCliente,
  getNewId,
  updateClienteIdInPedido
}
