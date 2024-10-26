import service from '../../service/v1/pedido.service.js'
import { cuerpoPedidoFormat, washServiceFormat } from './utils/pedido.js'
import { fechaFormat } from './utils/fechaFormat.js'

export const createPedido = async (req, res) => {
  const { encabezadoPedido, allService, allAceites, allNewFilters } = req.body

  const idPedido = await service.getNewIdPedido()
  encabezadoPedido.idPedido = idPedido

  try {
    await service.createEncabezadoPedido(encabezadoPedido)

    if (encabezadoPedido.abono > 0) {
      await service.createAbono(idPedido, encabezadoPedido.abono, encabezadoPedido.fecha)
    }

    const newCuerpoPedido = cuerpoPedidoFormat({ allAceites, allNewFilters, idPedido })
    const newWashService = washServiceFormat(allService, encabezadoPedido)

    for (const item of newWashService) {
      await service.createWashService(item)
    }

    for (const item of newCuerpoPedido) {
      await service.createCuerpoPedido(item)
    }

    for (const item of newCuerpoPedido) {
      await service.restarInventario(item.idProducto, item.cantidad)
    }

    res.json({ message: 'Pedido creado correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getEncabezadoPedido = async (req, res) => {
  try {
    const encabezadoPedido = await service.getEncabezadoPedido()
    const data = encabezadoPedido.map((pedido) => {
      return {
        ...pedido,
        fecha: fechaFormat(pedido.fecha)
      }
    })
    if (encabezadoPedido.length === 0) {
      return res.send({
        status: 200,
        message: 'No hay pedidos registrados',
        data
      })
    } else if (encabezadoPedido.length > 0) {
      res.send({
        status: 200,
        message: 'Pedidos encontrados',
        data
      })
    } else {
      res.send({
        status: 404,
        message: 'No se encontraron pedidos'
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getDescripcionPedidoById = async (req, res) => {
  const { id } = req.params
  try {
    const [ventas] = await service.getDescripcionPedidoById(id)
    const [washService] = await service.getWashServiceById(id)
    const [pedido] = await service.getPedidoById(id)
    const abonos = await service.getAbonoById(id)
    const notes = await service.getNotasById(id)
    const result = {
      pedido,
      washService,
      ventas: ventas.map((venta) => {
        return {
          ...venta,
          idCategoria: venta.idCategoria === 'A' ? 'Aceite' : 'Filtro'
        }
      }),
      abonos: abonos.map((abono) => {
        return {
          ...abono,
          fecha: fechaFormat(abono.fecha),
          monto: parseFloat(abono.monto).toFixed(2)
        }
      }),
      notes: notes.map((note) => {
        return {
          ...note,
          fecha: fechaFormat(note.fecha)
        }
      })
    }
    if (pedido.length === 0) {
      return res.send({
        status: 200,
        message: 'No hay pedidos registrados',
        data: result
      })
    } else if (ventas.length === 0 && washService.length === 0) {
      res.send({
        status: 404,
        message: 'OPS! No se encontraron detalles del pedido'
      })
    } else {
      res.send({
        status: 200,
        message: 'Pedidos encontrados',
        data: result
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createNewAbono = async (req, res) => {
  const { idPedido, abono, fecha } = req.body
  try {
    await service.createAbono(idPedido, abono, fecha)
    console.log('Abono creado correctamente')
    await service.updateAbono(idPedido)
    res.json({ message: 'Abono creado correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deletePedidoById = async (req, res) => {
  const { id } = req.params
  try {
    await service.deletePedidoById(id)
    res.status(200).json({ message: 'Pedido eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getNotasById = async (req, res) => {
  const { id } = req.params
  try {
    const data = await service.getNotasById(id)
    res.json({ message: 'Notas encontradas', data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createNota = async (req, res) => {
  const { idPedido, nota } = req.body
  try {
    const data = await service.createNota(idPedido, nota)
    res.json({ message: 'Nota creada correctamente', data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteNota = async (req, res) => {
  const { id } = req.params
  try {
    await service.deleteNota(id)
    res.json({ message: 'Nota eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createDetails = async (req, res) => {
  const { newAbono, newNote } = req.body
  console.log('this is the new abono', newAbono)
  console.log('this is the new note', newNote)
  try {
    if (newAbono.abono !== '' && newAbono.abono !== 0) {
      await service.createAbono(newAbono.idPedido, newAbono.abono, newAbono.fecha)
      await service.updateAbono(newAbono.idPedido)
    }

    if (newNote.note !== '') {
      await service.createNota(newNote.idPedido, newNote.note)
    }

    res.json({ message: 'Detalles creados correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
