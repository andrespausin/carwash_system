import { useEffect, useState } from 'react'
import { getInventoryStatus } from '../../service/stadistics'

export const useInventoryStatus = () => {
  const [outOfStock, setOutOfStock] = useState([])
  const [lessThanMin, setLessThanMin] = useState([])
  useEffect(() => {
    getInventoryStatus().then((data) => {
      console.log(data)
      setOutOfStock(data.filter((item) => item.status === 'red'))
      setLessThanMin(data.filter((item) => item.status === 'yellow'))
    })
  }, [])
  return {
    outOfStock,
    lessThanMin
  }
}
