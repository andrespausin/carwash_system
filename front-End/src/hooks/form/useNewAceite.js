import { useEffect, useState } from 'react'
import { deleteAceite, createAceite, updateAceite } from '../../service/aceites.js'
import { ValidationForm, ValidationSubmit } from '../utils/validationForm.js'
import { useToast } from '@chakra-ui/react'
import { alertToast, alertToastAceite } from '../toast/alertToast.js'

export const useNewAceite = (editData) => {
  editData
    ? editData = [editData].map((aceite) => {
      return {
        idProducto: aceite.idProducto,
        stockMin: aceite.stock_min,
        stockMax: aceite.stock_max,
        stockActual: aceite.stock_actual,
        marca: aceite.marca,
        tipo: aceite.tipo,
        viscosidad: aceite.viscosidad,
        unidadPorEmpaque: aceite.unidad_por_empaque,
        precioCompraEmpaque: aceite.precio_compra_empaque,
        precioVentaEmpaque: aceite.precio_venta_empaque,
        precioVentaUnidad: aceite.precio_venta_unidad
      }
    })[0]
    : editData = null
  const [newAceite, setNewAceite] = useState(!editData
    ? ({
        idProducto: '',
        stockMin: '',
        stockMax: '',
        stockActual: '',
        marca: '',
        tipo: '',
        viscosidad: '',
        unidadPorEmpaque: '',
        precioCompraEmpaque: '',
        precioCompraUnidad: '',
        precioVentaEmpaque: '',
        precioVentaUnidad: ''
      })
    : {})

  // AQUI EN ESTA PARTE DEBEMOS HACER LAS VALIDACIONES SI ES QUE HAY ALGUNA
  const [deleteData, setDeleteData] = useState(null)
  const toast = useToast()
  const [validationFields, setValidationFields] = useState({
    idProducto: { isInvalid: false, message: '', isSubmitted: false },
    stockMin: { isInvalid: false, message: '', isSubmitted: false },
    stockMax: { isInvalid: false, message: '', isSubmitted: false },
    stockActual: { isInvalid: false, message: '', isSubmitted: false },
    marca: { isInvalid: false, message: '', isSubmitted: false },
    tipo: { isInvalid: false, message: '', isSubmitted: false },
    viscosidad: { isInvalid: false, message: '', isSubmitted: false },
    unidadPorEmpaque: { isInvalid: false, message: '', isSubmitted: false },
    precioCompraEmpaque: { isInvalid: false, message: '', isSubmitted: false },
    precioVentaEmpaque: { isInvalid: false, message: '', isSubmitted: false },
    precioVentaUnidad: { isInvalid: false, message: '', isSubmitted: false }
  })

  const handleBlur = (e) => {
    const { id } = e.target
    console.log(e.target.value)
    setValidationFields({
      ...validationFields,
      [id]: ValidationForm({ id, type: 'A', value: e.target.value })
    })
  }

  const handleChange = (e) => {
    console.log(validationFields)
    if (e.target.id === 'precioCompraEmpaque') {
      setNewAceite({
        ...newAceite,
        precioCompraEmpaque: e.target.value,
        precioCompraUnidad: (e.target.value / newAceite.unidadPorEmpaque).toFixed(2)
      })
    } else if ((e.target.id === 'unidadPorEmpaque' || e.target.id === 'stockMin' || e.target.id === 'stockMax' || e.target.id === 'stockActual') && e.target.type === 'number' && e.target.value !== '' && !(/^[0-9]\d*$/).test(e.target.value)) {
      setNewAceite({
        ...newAceite,
        [e.target.id]: ''
      })
    } else if ((e.target.id === 'precioCompraEmpaque' || e.target.id === 'precioVentaEmpaque' || e.target.id === 'precioVentaUnidad') && e.target.value !== '' && !(/^[0-9]\d*(\.\d+)?$/).test(e.target.value)) {
      setNewAceite({
        ...newAceite,
        [e.target.id]: ''
      })
    } else if (e.target.id === 'tipo') {
      setNewAceite({
        ...newAceite,
        [e.target.id]: e.target.value
      })
      setValidationFields({
        ...validationFields,
        [e.target.id]: ValidationForm({ id: e.target.id, type: 'A', value: e.target.value })
      })
    } else {
      setNewAceite({
        ...newAceite,
        [e.target.id]: e.target.value
      })
    }
  }

  const handleSubmit = (e) => {
    console.log(newAceite)
    console.log(validationFields)
    e.preventDefault()
    console.log(newAceite)
    console.log(validationFields)
    alertToastAceite({ condition: ValidationSubmit(validationFields), toast, onSuccessMethod: createAceite, object: newAceite, refreshPage })
  }

  const handleEdit = (e) => {
    e.preventDefault()
    updateAceite(editData.idProducto, newAceite)
    refreshPage()
  }

  useEffect(() => {
    if (deleteData) {
      alertToast(true, toast, 'error', deleteAceite, deleteData.idProducto, refreshPage, 'Aceite eliminado', 'El aceite ha sido eliminado correctamente')
    }
  }, [deleteData])

  const refreshPage = () => {
    window.location.reload()
  }

  return {
    newAceite,
    handleChange,
    handleSubmit,
    handleEdit,
    setDeleteData,
    handleBlur,
    validationFields
  }
}
