import { RUTA_FILTROS, RUTA_FILTROS_ID } from '../constants.js'

export const getFiltros = async () => {
  const response = await fetch(RUTA_FILTROS)
  const data = await response.json()
  return data
}

export const getAllFiltrosId = async () => {
  const response = await fetch(RUTA_FILTROS_ID)
  const data = await response.json()
  return data.data
}

export const createFiltro = async (filtro) => {
  const response = await fetch(RUTA_FILTROS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filtro)
  })
  const data = await response.json()
  return data
}

export const updateFiltro = async (id, filtro) => {
  const response = await fetch(`${RUTA_FILTROS}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filtro)
  })
  const data = await response.json()
  return data
}

export const deleteFiltro = async (id) => {
  const response = await fetch(`${RUTA_FILTROS}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return data
}
