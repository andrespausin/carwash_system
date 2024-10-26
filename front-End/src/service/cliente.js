import { RUTA_CLIENTES, RUTA_CLIENTES_ID } from '../constants'

export const getClientes = async () => {
  const response = await fetch(RUTA_CLIENTES)
  const data = await response.json()
  return data
}

export const getAllClientesId = async () => {
  const response = await fetch(RUTA_CLIENTES_ID)
  const data = await response.json()
  return data.data
}

export const createCliente = async (cliente) => {
  const response = await fetch(RUTA_CLIENTES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  })
  const data = await response.json()
  return data
}

export const updateCliente = async (id, cliente) => {
  const response = await fetch(`${RUTA_CLIENTES}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  })
  const data = await response.json()
  return data
}

export const deleteCliente = async (id) => {
  const response = await fetch(`${RUTA_CLIENTES}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return data
}
