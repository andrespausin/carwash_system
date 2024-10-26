import { RUTA_PEDIDO } from '../constants'

export const createPedido = async (formData) => {
  console.log(formData)
  const res = await fetch(RUTA_PEDIDO, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  console.log(data)
  return data
}

export const getPedidos = async () => {
  const res = await fetch(RUTA_PEDIDO)
  const data = await res.json()
  return data
}

export const detallesPedido = async (id) => {
  const res = await fetch(`${RUTA_PEDIDO}/${id}`)
  const data = await res.json()
  console.log(data)
  return data.data
}

export const createNewDetails = async (data) => {
  const res = await fetch(`${RUTA_PEDIDO}/details`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const dataResponse = await res.json()
  return dataResponse
}

export const createNewAbono = async (newAbono) => {
  console.log(newAbono)
  const res = await fetch(`${RUTA_PEDIDO}/abono`, {
    method: 'POST',
    body: JSON.stringify(newAbono),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  return data
}

export const getAbonoById = async (id) => {
  const res = await fetch(`${RUTA_PEDIDO}/abono/${id}`)
  const data = await res.json()
  console.log(data)
  return data
}

export const deletePedidoById = async (id) => {
  const res = await fetch(`${RUTA_PEDIDO}/${id}`, {
    method: 'DELETE'
  })
  const data = await res.json()
  console.log(data)
  return data
}
