import { pool } from '../../db.js'

const createEncabezadoPedido = async (encabezadoPedido) => {
  const [data] = await pool.query('INSERT INTO pedido SET ?', [encabezadoPedido])

  return data
}

const getNewIdPedido = async () => {
  const [data] = await pool.query('SELECT idPedido FROM pedido ORDER BY pedido.idPedido DESC LIMIT 1;')
  if (data.length === 0) {
    return 'P-00000001'
  } else {
    return `P-${(parseInt(data[0].idPedido.split('-')[1]) + 1).toString().padStart(8, '0')}`
  }
}

const getEncabezadoPedido = async () => {
  const [data] = await pool.query('SELECT idPedido, pedido.idCliente, nombre, monto, abono, fecha, cliente.direccion FROM pedido INNER JOIN cliente ON pedido.idCliente = cliente.idCliente;')
  return data
}

const createWashService = async (washService) => {
  const { idPedido, placa, marca, modelo, tipoServicio, precio, fecha } = washService
  const newWashService = {
    idPedido,
    placa,
    marca,
    modelo,
    tipoServicio,
    precio,
    fecha
  }

  const [data] = await pool.query('INSERT INTO washservice SET ?', [newWashService])
  return data
}

const createCuerpoPedido = async (cuerpoPedido) => {
  const [data] = await pool.query('INSERT INTO cuerpo_pedido SET ?', [cuerpoPedido])
  return data
}

const restarInventario = async (idProducto, cantidad) => {
  const [data] = await pool.query('UPDATE inventario SET stock_actual = stock_actual - ? WHERE idProducto = ?', [cantidad, idProducto])
  return data
}

const getDescripcionPedidoById = async (id) => {
  const data = await pool.query('SELECT inventario.idProducto, inventario.idCategoria, cantidad, total, descripcion FROM pedido INNER JOIN cuerpo_pedido ON pedido.idPedido = cuerpo_pedido.idPedido INNER JOIN inventario ON cuerpo_pedido.idProducto = inventario.idProducto WHERE pedido.idPedido=?;', [id])
  return data
}

const getWashServiceById = async (id) => {
  const data = await pool.query('SELECT placa, fecha, tipoServicio, marca, modelo, precio FROM washservice WHERE idPedido=?;', [id])
  return data
}

const getPedidoById = async (id) => {
  const [data] = await pool.query('SELECT * FROM pedido WHERE idPedido=?;', [id])
  return data
}

const createAbono = async (idPedido, abono, fecha) => {
  const [data] = await pool.query('INSERT INTO abonos (idPedido, monto, fecha) VALUES (?, ? , ?);', [idPedido, abono, fecha])
  console.log('Se creo el abono correctamente')
  return data
}

const updateAbono = async (idPedido) => {
  const [data] = await pool.query('UPDATE pedido SET abono = (SELECT SUM(monto) FROM abonos WHERE idPedido = ?) WHERE idPedido = ?;', [idPedido, idPedido])
  console.log('Se actualizo el abono correctamente')
  return data
}

const getAbonoById = async (idPedido) => {
  const [data] = await pool.query('SELECT monto, fecha FROM `abonos` WHERE idPedido = ? ORDER BY `abonos`.`fecha` DESC ', [idPedido])
  return data
}

const deletePedidoById = async (idPedido) => {
  await pool.query('DELETE FROM pedido WHERE idPedido = ?', [idPedido])
  await pool.query('DELETE FROM abonos WHERE idPedido = ?', [idPedido])
  await pool.query('DELETE FROM cuerpo_pedido WHERE idPedido = ?', [idPedido])
  await pool.query('DELETE FROM washservice WHERE idPedido = ?', [idPedido])
}

const getNotasById = async (id) => {
  const [data] = await pool.query('SELECT * FROM notas WHERE idPedido=?;', [id])
  return data
}

const createNota = async (idPedido, nota) => {
  const dia = new Date().getDate()
  const mes = new Date().getMonth() + 1
  const anio = new Date().getFullYear()
  const newNota = {
    idPedido,
    descripcion: nota,
    fecha: `${anio}-${mes}-${dia}`
  }

  const [data] = await pool.query('INSERT INTO notas (idPedido, descripcion, fecha) VALUES (?, ?, ?)', [idPedido, nota, newNota.fecha])
  return data
}

const deleteNota = async (id) => {
  const [data] = await pool.query('DELETE FROM notas WHERE idPedido=?;', [id])
  return data
}
export default {
  createEncabezadoPedido,
  getNewIdPedido,
  createWashService,
  createCuerpoPedido,
  restarInventario,
  getEncabezadoPedido,
  getDescripcionPedidoById,
  getWashServiceById,
  getPedidoById,
  createAbono,
  updateAbono,
  getAbonoById,
  deletePedidoById,
  getNotasById,
  createNota,
  deleteNota
}
