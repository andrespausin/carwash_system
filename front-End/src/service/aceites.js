import { RUTA_ACEITES_ID, RUTA_ACEITES } from '../constants'

export const getAceites = async () => {
  const response = await fetch(RUTA_ACEITES)
  const data = await response.json()
  return data
}

export const getAllAceitesId = async () => {
  const response = await fetch(RUTA_ACEITES_ID)
  const data = await response.json()
  return data.data
}

export const createAceite = async (aceite) => {
  const response = await fetch(RUTA_ACEITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(aceite)
  })
  const data = await response.json()
  return data
}

export const updateAceite = async (id, aceite) => {
  console.log(id)
  const response = await fetch(`${RUTA_ACEITES}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(aceite)
  })
  const data = await response.json()
  return data
}

export const deleteAceite = async (id) => {
  const response = await fetch(`${RUTA_ACEITES}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return data
}
