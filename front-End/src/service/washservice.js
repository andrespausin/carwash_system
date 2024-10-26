import { RUTA_SERVICIO } from '../constants.js'

export const getServicios = async () => {
  const response = await fetch(RUTA_SERVICIO)
  const data = await response.json()
  return data
}

export const createServicio = async (servicio) => {
  const response = await fetch(RUTA_SERVICIO, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(servicio)
  })
  const data = await response.json()
  return data
}

export const updateServicio = async (servicio) => {
  const response = await fetch(`${RUTA_SERVICIO}/${servicio.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(servicio)
  })
  const data = await response.json()
  return data
}

export const deleteServicio = async (servicio) => {
  const response = await fetch(`${RUTA_SERVICIO}/${servicio.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(servicio)
  })
  const data = await response.json()
  return data
}
