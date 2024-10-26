import { Router } from 'express'
// Aqui deben ir las funciones a importar del controlador
import { salesPercentage, salesPerMonth, productsNoStock } from '../../controller/v2/dashboard.controller.js'

const router = Router()

// Aqui deben ir las rutas de los clientes con sus respectivas funciones del controlador
router.get('/', salesPercentage)

// Ruta que te permite obtener las ventas por mes, del mes actual a un año atras
router.get('/sales-per-month', salesPerMonth)

// Ruta que retorna los productos que estan por debajo del stock minimo
router.get('/products-no-stock', productsNoStock)

export default router
