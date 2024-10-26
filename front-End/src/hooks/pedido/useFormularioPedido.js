import { useState, useEffect, useRef } from 'react'
import { createPedido } from '../../service/pedidos'
import { alertToast } from '../toast/alertToast'
import { useToast } from '@chakra-ui/react'
import { usePedido } from './usePedido'
const useFormularioPedido = () => {
  const [abonoAlert, setAbonoAlert] = useState(true)
  const [onSubmit, setOnSubmit] = useState(false)
  const [newEncabezadoPedido, setNewEncabezadoPedido] = useState({
    idPedido: '',
    idCliente: '',
    monto: '',
    abono: 0,
    fecha: ''
  })
  const { aceites } = usePedido()
  const allService = useRef([])
  const allAceites = useRef([])
  const allNewFilters = useRef([])

  const calculateMonto = () => {
    const montoTotalAllService = allService.current.reduce((acumulador, valorActual) => parseFloat(acumulador) + parseFloat(valorActual.monto), 0)
    console.log(montoTotalAllService)
    allAceites.current = allAceites.current.map((item) => {
      return {
        ...item,
        cantEmpaque: aceites.find((aceite) => aceite.idProducto === item.idProducto).unidad_por_empaque
      }
    })
    console.log(allAceites.current)
    const montoTotalAllAceites = allAceites.current.reduce((acumulador, valorActual) => parseFloat(acumulador + valorActual.precio), 0)
    console.log(montoTotalAllAceites)

    const montoTotalAllNewFilters = allNewFilters.current.reduce((acumulador, valorActual) => parseFloat(acumulador + valorActual.precio), 0)
    console.log(montoTotalAllNewFilters)

    const montoTotal = montoTotalAllService + montoTotalAllAceites + montoTotalAllNewFilters
    console.log(allNewFilters.current)
    console.log(montoTotal)
    return montoTotal
  }

  const handleSubmit = (e) => {
    const isValidWashService = Object.values(allService.current).every((value) => value !== '')
    const isValidAceite = Object.values(allAceites.current).every((value) => value !== '')
    const isValidNewFilter = Object.values(allNewFilters.current).every((value) => value !== '')

    const montoTotal = parseFloat(calculateMonto())
    console.log(montoTotal)
    !abonoAlert
      ? setNewEncabezadoPedido({
        ...newEncabezadoPedido,
        monto: montoTotal,
        abono: montoTotal
      })
      : setNewEncabezadoPedido({
        ...newEncabezadoPedido,
        monto: montoTotal
      })

    e.preventDefault()
    // FUNCIONA console.log(allAceites.current, allService.current, allNewFilters.current)
    if (isValidWashService && isValidAceite && isValidNewFilter && newEncabezadoPedido.idCliente !== '' && newEncabezadoPedido.fecha !== '') {
      setOnSubmit(true)
    } else {
      // window.alert('Llena todos los campos')
      alertToast(true, toast, 'error', null, null, null, 'Verifique los datos ingresados, por favor', 'Revise tanto el cliente como el detalle del pedido', 5000)
    }
    // window.location.reload()
  }
  const toast = useToast()

  useEffect(() => {
    if (onSubmit) {
      const formData = {
        encabezadoPedido: newEncabezadoPedido,
        allService: allService.current,
        allAceites: allAceites.current,
        allNewFilters: allNewFilters.current
      }
      console.log('este es el formaData', formData)

      alertToast(true, toast, 'success', createPedido, formData, refreshPage, 'Pedido creado correctamente', 'El pedido ha sido creado correctamente')
    }
  })

  const refreshPage = () => {
    window.location.reload()
  }
  return {
    abonoAlert,
    setAbonoAlert,
    onSubmit,
    setOnSubmit,
    newEncabezadoPedido,
    setNewEncabezadoPedido,
    allService,
    allAceites,
    allNewFilters,
    handleSubmit,
    calculateMonto
  }
}

export {
  useFormularioPedido
}
