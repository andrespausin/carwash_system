import { Router } from 'express'
import { getAllInventario, getAllFiltros, getAllAceites, createFiltro, createAceite, updateAceite, updateFiltro, deleteAceite, deleteFiltros, getAllIdAceites, getAllIdFiltros, deleteOfInvetory } from '../../controller/v1/inventario.controller.js'

const router = Router()

router.get('/', getAllInventario)

/// /////////////// GET ///////////////////////

router.get('/filtros', getAllFiltros)

router.get('/filtros/all/id', getAllIdFiltros)

router.get('/aceites', getAllAceites)

router.get('/aceites/all/id', getAllIdAceites)

/// /////////////// POST ///////////////////////

router.post('/filtros', createFiltro)

router.post('/aceites', createAceite)

/// /////////////// PATCH ///////////////////////

router.patch('/filtros/:id', updateFiltro)

router.patch('/aceites/:id', updateAceite)

/// /////////////// DELETE ///////////////////////

router.delete('/aceites/:id', deleteAceite)

router.delete('/filtros/:id', deleteFiltros)

router.delete('/producto/:id', deleteOfInvetory)

export default router
