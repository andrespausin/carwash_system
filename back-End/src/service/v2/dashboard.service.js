import { pool } from '../../db.js'

const getSalesData = async () => {
  const [total] = await pool.query('SELECT SUM(monto) AS total FROM pedido;')
  const [filtros] = await pool.query('SELECT SUM(total) AS totalFiltro FROM cuerpo_pedido INNER JOIN inventario ON cuerpo_pedido.idProducto = inventario.idProducto WHERE idCategoria = "F";')
  const [aceites] = await pool.query('SELECT SUM(total) AS totalAceite FROM cuerpo_pedido INNER JOIN inventario ON cuerpo_pedido.idProducto = inventario.idProducto WHERE idCategoria = "A";')
  const [servicios] = await pool.query('SELECT SUM(precio) AS totalWashService FROM washservice;')
  return {
    total: total[0].total ? total[0].total : 0,
    filtros: filtros[0].totalFiltro ? filtros[0].totalFiltro : 0,
    aceites: aceites[0].totalAceite ? aceites[0].totalAceite : 0,
    servicios: servicios[0].totalWashService ? servicios[0].totalWashService : 0
  }
}

const getSalesPerMonth = async (fecha) => {
  const fecha1 = fecha.split('-')[0] + '-' + fecha.split('-')[1] + '-01'
  const fecha2 = fecha.split('-')[0] + '-' + fecha.split('-')[1] + '-31'
  const name = fecha.split('-')[0] + '-' + fecha.split('-')[1]
  const [data] = await pool.query('SELECT SUM(monto) AS total FROM `pedido` WHERE fecha BETWEEN ? AND ?;', [fecha1, fecha2])
  data[0].total = data[0].total ? data[0].total : 0
  data[0].fecha = name
  return data
}

const getProductsNoStock = async () => {
  const aceites = await aceitesNoStock()
  const filtros = await filtrosNoStock()
  return {
    aceites,
    filtros
  }
}

const aceitesNoStock = async () => {
  const [data] = await pool.query('SELECT inventario.idProducto, stock_min, stock_actual, stock_max, marca, tipo, viscosidad, unidad_por_empaque, precio_compra_empaque, precio_compra_unidad, precio_venta_empaque, precio_venta_unidad FROM inventario inner join aceites on inventario.idProducto = aceites.idProducto WHERE stock_actual <= stock_min AND idCategoria = "A";')
  return data
}

const filtrosNoStock = async () => {
  const [data] = await pool.query('SELECT * FROM inventario inner join filtros on inventario.idProducto = filtros.idProducto WHERE stock_actual <= stock_min AND idCategoria = "F";')
  return data
}

export default {
  getSalesData,
  getSalesPerMonth,
  getProductsNoStock
}
