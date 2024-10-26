import { useState } from 'react'
import { usePedido } from '../../hooks/pedido/usePedido'
import { useRegister } from './useRegister'
export const useAceiteRegister = ({ allAceites }) => {
  // ESTE CUSTOM H NO SE USAAAAAAAAA
  // ESTO SALE DE LA BASE DE DATOS, VIENE DEL CUSTOM HOOK EMPLEADO EN EL CONTEXTO DEL FORMULARIO
  console.log(allAceites)
  const { aceites } = usePedido()
  const [newAceite, setNewAceite] = useState({
    idProducto: '',
    cantidad: 0,
    precio: '',
    empaque: false
  })
  const { handleChange, handleBlur } = useRegister(allAceites, newAceite, setNewAceite)

  const aceiteHandleChange = (e) => {
    if (e.target.id === 'cantidad') {
      const esEmpaque = newAceite.empaque
      const precio = esEmpaque ? aceites.find(aceite => aceite.idProducto === newAceite.idProducto).precio_venta_empaque : aceites.find(aceite => aceite.idProducto === newAceite.idProducto).precio_venta_unidad
      setNewAceite({
        ...newAceite,
        [e.target.id]: e.target.value,
        precio: precio * e.target.value
      })
    } else if (e.target.id === 'empaque') {
      setNewAceite({
        ...newAceite,
        [e.target.id]: e.target.checked,
        precio: e.target.checked ? aceites.find(aceite => aceite.idProducto === newAceite.idProducto).precio_venta_empaque * newAceite.cantidad : aceites.find(aceite => aceite.idProducto === newAceite.idProducto).precio_venta_unidad * newAceite.cantidad
      })
    }
  }
  return {
    aceites,
    newAceite,
    aceiteHandleChange,
    handleChange,
    handleBlur
  }
}
