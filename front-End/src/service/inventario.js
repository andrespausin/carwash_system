import { RUTA_INVENTARIO } from '../constants'

export const getInventario = async () => {
  const response = await fetch(RUTA_INVENTARIO)
  const data = await response.json()
  return data
}

export const deleteInventario = async (id) => {
  const response = await fetch(`${RUTA_INVENTARIO}/producto/${id}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}

export const editInventario = async (id, data) => {
  const response = await fetch(`${RUTA_INVENTARIO}/producto/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const res = await response.json()
  return res
}
