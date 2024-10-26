import { Router } from 'express'
import { getAllInventario } from '../../controller/v2/inventario.controller.js'

const router = Router()

router.get('/', getAllInventario)

export default router
