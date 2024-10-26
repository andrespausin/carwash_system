import service from '../../service/v2/dashboard.service.js'
export const salesPercentage = async (req, res) => {
  try {
    const data = await service.getSalesData()
    if (data.length === 0) {
      return res.status(404).json({ message: 'No se encontraron los datos solicitados' })
    } else {
      console.log(data)
      const percentage = data.total === 0
        ? {
            filtros: 0,
            aceites: 0,
            servicios: 0
          }
        : {
            filtros: ((data.filtros) * 100 / data.total).toFixed(2),
            aceites: ((data.aceites) * 100 / data.total).toFixed(2),
            servicios: ((data.servicios) * 100 / data.total).toFixed(2)
          }
      res.send({
        status: 200,
        message: 'Datos encontrados',
        data: percentage
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al obtener los clientes',
      error: error.message
    })
  }
}

export const salesPerMonth = async (req, res) => {
  try {
    const fechaActual = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    const result = []
    // ITERAMOS PARA OBTENER LOS DATOS DE LOS 12 MESES ANTERIORES

    for (let i = 0; i < 12; i++) {
      const currentMonth = fechaActual.split('-')[1] - i
      if (currentMonth <= 0) {
        const [data] = await service.getSalesPerMonth((fechaActual.split('-')[0] - 1) + '-' + (12 + currentMonth) + '-' + fechaActual.split('-')[2])
        result.push(data)
        // console.log(data, 'del mes ' + (12 + currentMonth))
      } else {
        const [data] = await service.getSalesPerMonth(fechaActual.split('-')[0] + '-' + currentMonth + '-' + fechaActual.split('-')[2])
        result.push(data)
        // console.log(data, 'del mes ' + currentMonth)
      }
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'No se encontraron los datos solicitados' })
    } else {
      res.send({
        status: 200,
        message: 'Datos encontrados',
        data: result
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al obtener los clientes',
      error: error.message
    })
  }
}

export const productsNoStock = async (req, res) => {
  try {
    const data = await service.getProductsNoStock()
    if (data.length === 0) {
      return res.status(404).json({ message: 'No se encontraron los datos solicitados' })
    } else {
      res.send({
        status: 200,
        message: 'Datos encontrados',
        data
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al obtener los clientes',
      error: error.message
    })
  }
}
