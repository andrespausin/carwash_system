import { detallesPedido } from '../../service/pedidos'
import { useEffect, useState } from 'react'
export const useDetails = () => {
  const [details, setDetails] = useState(null)
  const [idDetails, setIdDetails] = useState(null)
  const [type, setType] = useState(null)

  const handleDetails = async (id) => {
    const data = await detallesPedido(id)
    setDetails(data)
  }

  useEffect(() => {
    if (idDetails) {
      handleDetails(idDetails)
      setTimeout(() => {
        setIdDetails(null)
      }, 1000)
    }
  }, [idDetails])

  return { details, setDetails, setIdDetails, idDetails, setType, type }
}
