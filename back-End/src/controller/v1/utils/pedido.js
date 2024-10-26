export const cuerpoPedidoFormat = ({ allAceites, allNewFilters, idPedido }) => {
  allAceites = allAceites.map((item) => {
    return {
      ...item,
      cantidad: item.empaque ? item.cantidad * item.cantEmpaque : item.cantidad
    }
  })
  const newCuerpoPedido = allAceites.concat(allNewFilters).map((item) => {
    return {
      idPedido,
      idProducto: item.idProducto,
      cantidad: item.cantidad,
      total: item.precio ? item.precio : item.monto,
      descripcion: item.descripcion ? item.descripcion : null
    }
  }
  )
  return newCuerpoPedido
}

export const washServiceFormat = (allService, encabezadoPedido) => {
  const newWashService = allService.map((item) => {
    return {
      idPedido: encabezadoPedido.idPedido,
      placa: item.placa,
      fecha: encabezadoPedido.fecha,
      tipoServicio: item.tipoLavado,
      marca: item.marca,
      modelo: item.modelo,
      precio: item.monto
    }
  }
  )
  return newWashService
}
