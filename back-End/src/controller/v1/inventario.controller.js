import service from '../../service/v1/inventario.service.js'

export const getAllInventario = async (req, res) => {
  try {
    const inventario = await service.getAllInventario()
    if (inventario.length === 0) {
      return res.send({
        status: 200,
        message: 'No hay productos registrados',
        data: inventario
      })
    } else if (inventario.length > 0) {
      res.send({
        status: 200,
        message: 'Productos encontrados',
        data: inventario
      })
    } else {
      res.send({
        status: 404,
        message: 'No se encontraron productos'
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

export const getAllFiltros = async (req, res) => {
  try {
    const filtros = await service.getAllFiltros()
    if (filtros.length === 0) {
      return res.send({
        status: 200,
        message: 'No hay filtros registrados',
        data: filtros
      })
    } else if (filtros.length > 0) {
      res.send({
        status: 200,
        message: 'Filtros encontrados',
        data: filtros
      })
    } else {
      res.send({
        status: 404,
        message: 'No se encontraron filtros'
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al obtener los filtros',
      error: error.message
    })
  }
}

export const getAllIdFiltros = async (req, res) => {
  try {
    const filtros = await service.getAllFiltros()
    if (filtros.length === 0) {
      return res.send({
        status: 200,
        message: 'No hay filtros registrados',
        data: filtros
      })
    } else if (filtros.length > 0) {
      const idFiltros = filtros.map((filtro) => {
        return filtro.idProducto
      })
      res.send({
        status: 200,
        message: 'Filtros encontrados',
        data: idFiltros
      })
    } else {
      res.send({
        status: 404,
        message: 'No se encontraron filtros'
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al obtener los filtros',
      error: error.message
    })
  }
}

export const getAllAceites = async (req, res) => {
  try {
    const aceites = await service.getAllAceites()
    if (aceites.length === 0) {
      return res.send({
        status: 200,
        message: 'No hay aceites registrados',
        data: aceites
      })
    } else if (aceites.length > 0) {
      res.send({
        status: 200,
        message: 'Aceites encontrados',
        data: aceites
      })
    } else {
      res.send({
        status: 404,
        message: 'No se encontraron aceites'
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al obtener los aceites',
      error: error.message
    })
  }
}

export const getAllIdAceites = async (req, res) => {
  try {
    const aceites = await service.getAllAceites()
    if (aceites.length === 0) {
      return res.send({
        status: 200,
        message: 'No hay aceites registrados',
        data: aceites
      })
    } else if (aceites.length > 0) {
      const idAceites = aceites.map((aceite) => {
        return aceite.idProducto
      })
      res.send({
        status: 200,
        message: 'Aceites encontrados',
        data: idAceites
      })
    } else {
      res.send({
        status: 404,
        message: 'No se encontraron aceites'
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al obtener los aceites',
      error: error.message
    })
  }
}

export const createFiltro = async (req, res) => {
  try {
    const { idProducto, stockMin, stockMax, stockActual, marca, tipo, precioCompra, precioVenta, modeloVehiculo } = req.body
    const filtro = {
      idProducto,
      stockMin,
      stockMax,
      stockActual,
      marca,
      tipo,
      precioCompra,
      precioVenta,
      modeloVehiculo
    }
    const newFiltro = await service.createFiltro(filtro)
    res.status(201).send({
      status: 201,
      message: 'Filtro creado',
      data: newFiltro
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al crear el filtro',
      error: error.message
    })
  }
}

export const createAceite = async (req, res) => {
  try {
    const { idProducto, stockMin, stockMax, stockActual, marca, tipo, viscosidad, unidadPorEmpaque, precioCompraEmpaque, precioVentaEmpaque, precioVentaUnidad } = req.body
    const aceite = {
      idProducto,
      stockMin,
      stockMax,
      stockActual,
      marca,
      tipo,
      viscosidad,
      unidadPorEmpaque,
      precioCompraUnidad: precioCompraEmpaque / unidadPorEmpaque,
      precioCompraEmpaque,
      precioVentaEmpaque,
      precioVentaUnidad
    }
    const newAceite = await service.createAceite(aceite)
    res.status(201).send({
      status: 201,
      message: 'Aceite creado',
      data: newAceite
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al crear el aceite',
      error: error.message
    })
  }
}

export const updateFiltro = async (req, res) => {
  try {
    const { stockMin, stockMax, stockActual, marca, tipo, precioCompra, precioVenta, modeloVehiculo } = req.body
    const filtro = {
      stockMin,
      stockMax,
      stockActual,
      marca,
      tipo,
      precioCompra,
      precioVenta,
      modeloVehiculo
    }
    const newFiltro = await service.updateFiltro(req.params.id, filtro)
    res.status(201).send({
      status: 201,
      message: 'Filtro actualizado',
      data: newFiltro
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al actualizar el filtro',
      error: error.message
    })
  }
}

export const updateAceite = async (req, res) => {
  try {
    const { stockMin, stockMax, stockActual, marca, tipo, viscosidad, unidadPorEmpaque, precioCompraEmpaque, precioVentaEmpaque, precioVentaUnidad } = req.body
    const aceite = {
      stockMin,
      stockMax,
      stockActual,
      marca,
      tipo,
      viscosidad,
      unidadPorEmpaque,
      precioCompraUnidad: precioCompraEmpaque / unidadPorEmpaque,
      precioCompraEmpaque,
      precioVentaUnidad,
      precioVentaEmpaque

    }

    const newAceite = await service.updateAceite(req.params.id, aceite)
    res.status(201).send({
      status: 201,
      message: 'Aceite actualizado',
      data: newAceite
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message: 'Error al actualizar el aceite',
      error: error.message
    })
  }
}

export const deleteAceite = async (req, res) => {
  try {
    const { id } = req.params
    const deleteAceite = await service.deleteAceite(id)
    res.status(201).send({
      status: 201,
      message: 'Aceite eliminado',
      data: deleteAceite
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al eliminar el aceite',
      error: error.message
    })
  }
}

export const deleteFiltros = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const deleteFiltros = await service.deleteFiltro(id)
    res.status(201).send({
      status: 201,
      message: 'Filtros eliminados',
      data: deleteFiltros
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al eliminar los filtros',
      error: error.message
    })
  }
}

export const deleteOfInvetory = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const deleteOfInvetory = await service.deleteOfInvetory(id)
    res.status(201).send({
      status: 201,
      message: 'Producto eliminado',
      data: deleteOfInvetory
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al eliminar el producto',
      error: error.message
    })
  }
}
