import { pool } from '../../db.js'

const getAllWashServices = async () => {
  const [data] = await pool.query('SELECT washservice.id, pedido.idPedido, pedido.idCliente, cliente.nombre, placa, washservice.fecha, tipoServicio, marca, modelo, precio FROM washservice INNER JOIN pedido ON washservice.idPedido = pedido.idPedido INNER JOIN cliente ON pedido.idCliente = cliente.idCliente;')
  return data
}

const getWashServicesComplete = async () => {
  const [data] = await pool.query("SELECT * FROM washservice WHERE tipoServicio = 'Completo';")
  return data
}

const getWashServicesBasic = async () => {
  const [data] = await pool.query("SELECT * FROM washservice WHERE tipoServicio = 'Básico';")
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

export default {
  getAllWashServices,
  getWashServicesComplete,
  getWashServicesBasic,
  createWashService
}
