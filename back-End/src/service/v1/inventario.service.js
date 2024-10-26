import { pool } from '../../db.js'

const getAllInventario = async () => {
  const filtros = await getAllFiltros()
  const aceites = await getAllAceites()
  const data = filtros.concat(aceites)
  return data
}

const getAllFiltros = async () => {
  const [data] = await pool.query(`SELECT 
  i.idCategoria,
  i.idProducto, 
  i.stock_min, 
  i.stock_max, 
  i.stock_actual, 
  f.marca, 
  f.tipo,  
  f.precioCompra,
  f.precioVenta,
  f.modelo_vehiculo

FROM inventario i
INNER JOIN filtros f ON i.idProducto = f.idProducto
WHERE i.idCategoria = 'F';`)
  return data
}

const getAllAceites = async () => {
  const [data] = await pool.query(`SELECT 
  i.idCategoria,
  i.idProducto, 
  i.stock_min, 
  i.stock_max, 
  i.stock_actual, 
  a.marca, 
  a.tipo,
  a.viscosidad, 
  a.unidad_por_empaque,
  a.precio_compra_unidad,
  a.precio_compra_empaque,
  a.precio_venta_unidad,
  a.precio_venta_empaque
  
FROM inventario i
INNER JOIN aceites a ON i.idProducto = a.idProducto
WHERE i.idCategoria = 'A';`)
  return data
}

const createFiltro = async (filtro) => {
  const { idProducto, stockMin, stockMax, stockActual, marca, tipo, precioCompra, precioVenta, modeloVehiculo } = filtro

  const newInventory = {
    idProducto,
    stock_min: stockMin,
    stock_max: stockMax,
    stock_actual: stockActual,
    idCategoria: 'F'
  }

  const newFiltro = {
    idProducto,
    marca,
    tipo,
    precioCompra,
    precioVenta,
    modelo_vehiculo: modeloVehiculo
  }

  const [data] = await pool.query('INSERT INTO filtros SET ? ;', [newFiltro])
  await pool.query('INSERT INTO inventario SET ? ;', [newInventory])
  return data
}

const createAceite = async (aceite) => {
  const { idProducto, stockMin, stockMax, stockActual, marca, tipo, viscosidad, unidadPorEmpaque, precioCompraUnidad, precioCompraEmpaque, precioVentaUnidad, precioVentaEmpaque } = aceite

  const newInventory = {
    idProducto,
    stock_min: stockMin,
    stock_max: stockMax,
    stock_actual: stockActual,
    idCategoria: 'A'
  }

  const newAceite = {
    idProducto,
    marca,
    tipo,
    viscosidad,
    unidad_por_empaque: unidadPorEmpaque,
    precio_compra_unidad: precioCompraUnidad,
    precio_compra_empaque: precioCompraEmpaque,
    precio_venta_unidad: precioVentaUnidad,
    precio_venta_empaque: precioVentaEmpaque
  }

  const [data] = await pool.query('INSERT INTO aceites SET ?;', [newAceite])

  await pool.query('INSERT INTO inventario SET ?;', [newInventory])
  return data
}

const updateFiltro = async (id, filtro) => {
  const { stockMin, stockMax, stockActual, marca, tipo, precioCompra, precioVenta, modeloVehiculo } = filtro
  const [data] = await pool.query('UPDATE filtros SET marca = IFNULL(?, marca), tipo = IFNULL(?, tipo), precioCompra = IFNULL(?, precioCompra), precioVenta = IFNULL(?, precioVenta), modelo_vehiculo = IFNULL(?, modelo_vehiculo) WHERE idProducto = ?;', [marca, tipo, precioCompra, precioVenta, modeloVehiculo, id])

  await pool.query('UPDATE inventario SET stock_min = IFNULL(?, stock_min), stock_max = IFNULL(?, stock_max), stock_actual = IFNULL(?, stock_actual) WHERE idProducto = ?;', [stockMin, stockMax, stockActual, id])

  return data
}

const updateAceite = async (id, aceite) => {
  const { stockMin, stockMax, stockActual, marca, tipo, viscosidad, unidadPorEmpaque, precioCompraEmpaque, precioVentaUnidad, precioVentaEmpaque } = aceite
  let { precioCompraUnidad } = aceite
  const [oldData] = await getValuesOfAceiteById(id)
  if (unidadPorEmpaque && precioCompraEmpaque) {
    precioCompraUnidad = precioCompraEmpaque / unidadPorEmpaque
  } else if (unidadPorEmpaque) {
    precioCompraUnidad = oldData.precio_compra_empaque / unidadPorEmpaque
  } else if (precioCompraEmpaque) {
    precioCompraUnidad = precioCompraEmpaque / oldData.unidad_por_empaque
  } else {
    precioCompraUnidad = null
  }
  const [data] = await pool.query('UPDATE aceites SET marca = IFNULL(?, marca), tipo = IFNULL(?, tipo), viscosidad = IFNULL(?, viscosidad), unidad_por_empaque = IFNULL(?, unidad_por_empaque), precio_compra_unidad = IFNULL(?, precio_compra_unidad), precio_compra_empaque = IFNULL(?, precio_compra_empaque), precio_venta_unidad = IFNULL(?, precio_venta_unidad), precio_venta_empaque = IFNULL(?, precio_venta_empaque) WHERE idProducto = ?;', [marca, tipo, viscosidad, unidadPorEmpaque, precioCompraUnidad, precioCompraEmpaque, precioVentaUnidad, precioVentaEmpaque, id])

  await pool.query('UPDATE inventario SET stock_min = IFNULL(?, stock_min), stock_max = IFNULL(?, stock_max), stock_actual = IFNULL(?, stock_actual) WHERE idProducto = ?;', [stockMin, stockMax, stockActual, id])

  return data
}

const deleteAceite = async (id) => {
  const [data] = await pool.query('DELETE FROM aceites WHERE idProducto = ?;', [id])
  await pool.query('DELETE FROM inventario WHERE idProducto = ? AND idCategoria = "A";', [id])
  return data
}

const deleteFiltro = async (id) => {
  const [data] = await pool.query('DELETE FROM filtros WHERE idProducto = ?;', [id])
  await pool.query('DELETE FROM inventario WHERE idProducto = ? AND idCategoria = "F";', [id])
  return data
}

const deleteOfInvetory = async (id) => {
  const [data] = await pool.query('DELETE FROM inventario WHERE idProducto = ?;', [id])
  await deleteAceite(id)
  await deleteFiltro(id)
  return data
}

const getValuesOfAceiteById = async (id) => {
  const [data] = await pool.query('SELECT unidad_por_empaque, precio_compra_empaque FROM aceites WHERE idProducto = ?;', [id])
  return data
}

export default {
  getAllInventario,
  getAllFiltros,
  getAllAceites,
  createFiltro,
  createAceite,
  updateFiltro,
  updateAceite,
  deleteAceite,
  deleteFiltro,
  deleteOfInvetory
}
