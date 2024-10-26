import { useEffect, useState } from 'react'
import { DONUT_STRUCTURE } from '../../constants'
import { getSalesPerType } from '../../service/stadistics'

export const useDonutOptions = () => {
  const [donutOptions, setDonutOptions] = useState('')
  const [data, setData] = useState(null)

  const handleData = async () => {
    getSalesPerType().then((data) => {
      console.log(data)
      const totalFiltros = data.filtros
      const totalAceites = data.aceites
      const totalLavados = data.servicios
      console.log(totalFiltros, totalAceites, totalLavados)
      const newDataPointsDonut = [
        {
          y: totalFiltros,
          name: 'Filtros'
        },
        {
          y: totalAceites,
          name: 'Aceites'
        },
        {
          y: totalLavados,
          name: 'Servicios'
        }
      ]
      console.log(newDataPointsDonut)
      DONUT_STRUCTURE.data[0].dataPoints = newDataPointsDonut
      setData(DONUT_STRUCTURE)
    })
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    setDonutOptions(DONUT_STRUCTURE)
  }, [data])

  return {
    donutOptions
  }
}
