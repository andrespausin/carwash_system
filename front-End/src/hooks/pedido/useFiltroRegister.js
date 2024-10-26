import { useState } from 'react'
import { usePedido } from '../../hooks/pedido/usePedido'
import { useRegister } from './useRegister'
export const useFiltroRegister = ({ allNewFilters }) => {
  // ESTO SALE DE LA BASE DE DATOS, VIENE DEL CUSTOM HOOK EMPLEADO EN EL CONTEXTO DEL FORMULARIO
  const { filtros } = usePedido()
  const [newFiltro, setNewFiltro] = useState({
    idProducto: '',
    cantidad: 0,
    precio: ''
  })
  const { handleChange, handleBlur } = useRegister(allNewFilters, newFiltro, setNewFiltro)

  const filtroHandleChange = (e) => {
    console.log(e.target.value)
    if (e.target.id === 'cantidad') {
      console.log('ESTOY EN EL CASO CANTIDAD')
      console.log(filtros)
      console.log(newFiltro)

      const precio = filtros.find(filtro => filtro.idProducto === newFiltro.idProducto).precioVenta
      console.log(precio)

      setNewFiltro({
        ...newFiltro,
        [e.target.id]: e.target.value,
        precio: precio * e.target.value
      })
    } else if (e.target.id === 'idProducto') {
      setNewFiltro({
        ...newFiltro,
        [e.target.id]: e.target.value
      })
      console.log('ESTOY EN EL CASO IDPRODUCTO')
      console.log(newFiltro)
      setNewFiltro({
        ...newFiltro,
        precio: filtros.find(filtro => filtro.idProducto === e.target.value).precioVenta * newFiltro.cantidad
      })
    }
  }
  return {
    filtros,
    newFiltro,
    filtroHandleChange,
    handleChange,
    handleBlur
  }
}
