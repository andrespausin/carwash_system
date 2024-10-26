import { RUTA_SPLINE, RUTA_DONUT, RUTA_TABLA_INVENTARIO } from '../constants'

export const getInventoryStatus = async () => {
  const response = await fetch(RUTA_TABLA_INVENTARIO)
  const data = await response.json()
  console.log(data.data)
  return data.data
}

export const getSalesPerMonth = async () => {
  const response = await fetch(RUTA_SPLINE)
  const data = await response.json()
  console.log(data.data)
  return data.data
}

export const getSalesPerType = async () => {
  const response = await fetch(RUTA_DONUT)
  const data = await response.json()
  console.log(data.data)
  return data.data
}
