import { Router } from 'express'
// Aqui deben ir las funciones a importar del controlador
import { getAllClientes, createCliente, updateCliente, deleteCliente, getAllClientesId } from '../../controller/v1/cliente.controller.js'

const router = Router()

// Aqui deben ir las rutas de los clientes con sus respectivas funciones del controlador
router.get('/', getAllClientes)

router.get('/all/id', getAllClientesId)

router.post('/', createCliente)

router.delete('/:id', deleteCliente)

router.patch('/:id', updateCliente)

export default router
