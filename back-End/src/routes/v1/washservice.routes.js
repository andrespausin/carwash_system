import { Router } from 'express'
import { getAllWashServices, getWashServicesBasic, getWashServicesComplete, createWashService } from '../../controller/v1/washservice.controller.js'

const router = Router()

// RUTA PARA OBTENER TODOS LOS SERVICIOS DE LAVADO
router.get('/', getAllWashServices)

router.post('/', createWashService)

router.get('/complete', getWashServicesComplete)

router.get('/basic', getWashServicesBasic)

export default router
