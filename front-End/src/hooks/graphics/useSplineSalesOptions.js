import { useEffect, useState } from 'react'
import { SPLINE_STRUCTURE } from '../../constants'
import { getSalesPerMonth } from '../../service/stadistics'

export const useSplineSalesOptions = () => {
  const [splineOptions, setSplineOptions] = useState('')
  const [data, setData] = useState(null)

  const handleData = async () => {
    getSalesPerMonth().then((data) => {
      const newDataPointsSpline = data.map((item) => {
        const year = item.fecha.split('-')[0]
        const month = parseInt(item.fecha.split('-')[1]) - 1
        return { x: new Date(year, month), y: parseFloat(item.total) }
      })

      SPLINE_STRUCTURE.data[0].dataPoints = newDataPointsSpline

      setData(SPLINE_STRUCTURE)
    })
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    setSplineOptions(SPLINE_STRUCTURE)
  }, [data])

  return {
    splineOptions
  }
}
