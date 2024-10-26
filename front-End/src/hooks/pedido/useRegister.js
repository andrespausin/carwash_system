import { useState, useEffect, useRef } from 'react'
import { alertToast } from '../toast/alertToast'
import { useToast } from '@chakra-ui/react'
export const useRegister = (allObject, object, setObject, objectDB = null, i) => {
  const [check, setCheck] = useState(0)
  const editFields = useRef([])
  const [maxCantidadAceite, setMaxCantidadAceite] = useState(12)
  const [maxCantidadFiltro, setMaxCantidadFiltro] = useState(12)
  const [index] = useState(i)

  const handleBlur = (e) => {
    if (!editFields.current.includes(e.target.id)) {
      if ((e.target.id !== 'placa' || e.target.id !== 'descripcion') && e.target.value !== '' && e.target.value !== '0') {
        editFields.current.push(e.target.id)
      }
    }
    switch (Object.values(object).length) {
      case 5: {
        if (e.target.id === 'cantidad' && e.target.value !== '0') {
          if (!editFields.current.includes('precio') || !editFields.current.includes('empaque')) {
            editFields.current.push('precio')
            editFields.current.push('empaque')
          }
        }
        if (editFields.current.length === 5) {
          setCheck(check + 1)
        } else {
          if (editFields.current.length === 4 && (!editFields.current.includes('placa') || !editFields.current.includes('descripcion'))) {
            setCheck(check + 1)
          }
        }
        break
      }
      case 4: {
        if (e.target.id === 'cantidad' && editFields.current.includes('idProducto') && e.target.value !== '0') {
          if (!editFields.current.includes('precio') || !editFields.current.includes('empaque')) {
            editFields.current.push('precio')
          }
        }
        if (editFields.current.length === 4) {
          setCheck(check + 1)
        } else {
          if (editFields.current.length === 3 && !editFields.current.includes('descripcion')) {
            setCheck(check + 1)
          }
        }

        break
      }
    }
    console.log(editFields.current)
  }

  useEffect(() => {
    if (check === 1) {
      try {
        console.log(object)
        allObject.current.push(object)
        console.log(allObject.current)
      } catch (err) {
        console.log(err)
      }
    } else if (check > 1) {
      console.log('entro mi valor es: ', check)
      console.log(allObject.current)
      allObject.current.splice(index - 1, 1, object)
      console.log(allObject.current)
    }
  }, [check])

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      setObject({
        ...object,
        [e.target.id]: e.target.checked
      })
    } else if (e.target.id === 'monto') {
      if (e.target.value.match(/[a-z]/i) || siContieneSignos(e.target.value) || e.target.value === '') {
        if (siContieneLetrasAntesDelFinal(e.target.value)) {
          setObject({
            ...object,
            [e.target.id]: ''
          })
        } else {
          setObject({
            ...object,
            [e.target.id]: e.target.value.slice(0, e.target.value.length - 1)
          })
        }
      } else {
        const str = e.target.value.includes(',') ? e.target.value.replace(',', '.') : e.target.value
        console.log(str)
        if (contadorDePuntos(str) > 1) {
          setObject({
            ...object,
            [e.target.id]: str.slice(0, str.length - 1)
          })
        } else {
          setObject({
            ...object,
            [e.target.id]: str
          })
        }
      }
    } else {
      setObject({
        ...object,
        [e.target.id]: e.target.value
      })
    }
  }

  const contadorDePuntos = (str) => {
    let contador = 0
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '.') {
        contador++
      }
    }
    return contador
  }

  const siContieneSignos = (str) => {
    const regex = /[-!$%^&*()_+|~=`{}[\]:";'<>?@/#]/g
    return regex.test(str)
  }

  const siContieneLetrasAntesDelFinal = (str) => {
    let i = 0
    while (i < str.length - 1) {
      if (str[i].match(/[a-z]/i)) {
        return true
      }
      i++
    }
    return false
  }
  const toast = useToast()

  const handleChangeAceite = (e) => {
    if (e.target.id === 'cantidad') {
      const { value } = e.target
      const esEmpaque = object.empaque
      const precio = esEmpaque ? objectDB.find(aceite => aceite.idProducto === object.idProducto).precio_venta_empaque : objectDB.find(aceite => aceite.idProducto === object.idProducto).precio_venta_unidad
      setObject({
        ...object,
        [e.target.id]: value < maxCantidadAceite ? value : maxCantidadAceite,
        precio: value < maxCantidadAceite ? parseFloat(precio * value) : parseFloat(precio * maxCantidadAceite)
      })

      if (value > maxCantidadAceite) {
        alertToast(true, toast, 'error', null, null, null, 'Error: Supera el stock actual', `Stock Actual: ${maxCantidadAceite}`, 3000)
      }
    } else if (e.target.id === 'empaque') {
      let maxCantidad = 0
      if (e.target.checked) {
        maxCantidad = Math.floor(objectDB.find(aceite => aceite.idProducto === object.idProducto).stock_actual / objectDB.find(aceite => aceite.idProducto === object.idProducto).unidad_por_empaque)
      } else {
        maxCantidad = objectDB.find(aceite => aceite.idProducto === object.idProducto).stock_actual
      }

      setMaxCantidadAceite(maxCantidad)
      let newPrecio = 0
      if (object.cantidad < maxCantidad) {
        newPrecio = e.target.checked ? objectDB.find(aceite => aceite.idProducto === object.idProducto).precio_venta_empaque * object.cantidad : objectDB.find(aceite => aceite.idProducto === object.idProducto).precio_venta_unidad * object.cantidad
      } else {
        newPrecio = e.target.checked ? objectDB.find(aceite => aceite.idProducto === object.idProducto).precio_venta_empaque * maxCantidad : objectDB.find(aceite => aceite.idProducto === object.idProducto).precio_venta_unidad * maxCantidad
      }

      setObject({
        ...object,
        [e.target.id]: e.target.checked,
        cantidad: object.cantidad > maxCantidad ? maxCantidad : object.cantidad,
        precio: parseFloat(newPrecio)
      })
    } else if (e.target.id === 'idProducto') {
      const maxCantidad = (object.empaque ? Math.floor(objectDB.find(aceite => aceite.idProducto === e.target.value).stock_actual / objectDB.find(aceite => aceite.idProducto === e.target.value).unidad_por_empaque) : objectDB.find(servicio => servicio.idProducto === e.target.value).stock_actual)
      const newPrecio = object.idProducto === '' ? 0 : object.empaque ? objectDB.find(aceite => aceite.idProducto === object.idProducto).precio_venta_empaque : objectDB.find(aceite => aceite.idProducto === object.idProducto).precio_venta_unidad
      setMaxCantidadAceite(maxCantidad)
      setObject({
        ...object,
        precio: newPrecio,
        [e.target.id]: e.target.value
      })
    } else {
      setObject({
        ...object,
        [e.target.id]: e.target.value
      })
    }
  }

  const handleChangeFiltro = (e) => {
    if (e.target.id === 'cantidad') {
      console.log(maxCantidadAceite)
      const precio = objectDB.find(filtro => filtro.idProducto === object.idProducto).precioVenta
      e.target.value = e.target.value < 0 ? 0 : e.target.value
      setObject({
        ...object,
        [e.target.id]: e.target.value < maxCantidadFiltro ? e.target.value : maxCantidadFiltro,
        precio: e.target.value < maxCantidadFiltro ? precio * e.target.value : precio * maxCantidadFiltro
      })

      if (e.target.value > maxCantidadFiltro) {
        alertToast(true, toast, 'error', null, null, null, 'Error: Supera el stock actual', `Stock Actual: ${maxCantidadFiltro}`, 3000)
      }
    } else if (e.target.id === 'idProducto') {
      const { cantidad } = object
      setMaxCantidadFiltro(objectDB.find(filtro => filtro.idProducto === e.target.value).stock_actual)
      setObject({
        ...object,
        [e.target.id]: e.target.value,
        precio: objectDB.find(filtro => filtro.idProducto === e.target.value).precioVenta * cantidad
      })
    } else {
      setObject({
        ...object,
        [e.target.id]: e.target.value
      })
    }
  }

  return {
    handleChange,
    handleBlur,
    handleChangeAceite,
    handleChangeFiltro
  }
}
