import service from '../../service/v1/inventario.service.js'
import { setStatus } from './utils/stockStatus.js'
export const getAllInventario = async (req, res) => {
  try {
    let inventario = await service.getAllInventario()
    inventario = inventario.map((item) => {
      return {
        ...item,
        status: setStatus({ object: item })
      }
    })
    if (inventario.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos' })
    } else {
      res.send({
        status: 200,
        message: 'Productos encontrados',
        data: inventario
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al obtener los productos',
      error: error.message
    })
  }
}
