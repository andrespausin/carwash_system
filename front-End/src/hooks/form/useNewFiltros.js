import { useState, useEffect } from 'react'
import { deleteFiltro, createFiltro, updateFiltro } from '../../service/filtros.js'
import { ValidationForm, ValidationSubmit } from '../utils/validationForm.js'
import { useToast } from '@chakra-ui/react'
import { alertToast, alertToastFiltro } from '../toast/alertToast.js'
export const useNewFiltro = (editData) => {
  editData
    ? editData = [editData].map((filtro) => {
      return {
        idProducto: filtro.idProducto,
        stockMin: filtro.stock_min,
        stockMax: filtro.stock_max,
        stockActual: filtro.stock_actual,
        marca: filtro.marca,
        tipo: filtro.tipo,
        precioCompra: filtro.precio_compra,
        precioVenta: filtro.precio_venta,
        modeloVehiculo: filtro.modelo_vehiculo
      }
    })[0]
    : editData = null
  const [newFiltro, setNewFiltro] = useState(!editData
    ? ({
        idProducto: '',
        stockMin: '',
        stockMax: '',
        stockActual: '',
        marca: '',
        tipo: '',
        precioCompra: '',
        precioVenta: '',
        modeloVehiculo: ''
      })
    : {})

  const [deleteData, setDeleteData] = useState(null)
  const toast = useToast()
  const [validationFields, setValidationFields] = useState({
    idProducto: { isInvalid: false, message: '', isSubmitted: false },
    stockMin: { isInvalid: false, message: '', isSubmitted: false },
    stockMax: { isInvalid: false, message: '', isSubmitted: false },
    stockActual: { isInvalid: false, message: '', isSubmitted: false },
    marca: { isInvalid: false, message: '', isSubmitted: false },
    tipo: { isInvalid: false, message: '', isSubmitted: false },
    precioCompra: { isInvalid: false, message: '', isSubmitted: false },
    precioVenta: { isInvalid: false, message: '', isSubmitted: false },
    modeloVehiculo: { isInvalid: false, message: '', isSubmitted: false }
  })

  const handleBlur = (e) => {
    const { id } = e.target
    setValidationFields({
      ...validationFields,
      [id]: ValidationForm({ id, type: 'F', value: newFiltro[id] })
    })
  }

  const handleChange = (e) => {
    if (e.target.id === 'tipo') {
      setNewFiltro({
        ...newFiltro,
        [e.target.id]: e.target.value
      })
      setValidationFields({
        ...validationFields,
        [e.target.id]: ValidationForm({ id: e.target.id, type: 'F', value: e.target.value })
      })
    } else if ((e.target.id === 'stockMin' || e.target.id === 'stockMax' || e.target.id === 'stockActual') && e.target.type === 'number' && !(/^[0-9]\d*$/).test(e.target.value)) {
      setNewFiltro({
        ...newFiltro,
        [e.target.id]: ''
      })
    } else {
      setNewFiltro({
        ...newFiltro,
        [e.target.id]: e.target.value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newFiltro)
    alertToastFiltro({
      condition: ValidationSubmit(validationFields),
      toast,
      onSuccessMethod: createFiltro,
      object: newFiltro,
      refreshPage
    })
  }

  const handleEdit = (e) => {
    e.preventDefault()
    updateFiltro(editData.idProducto, newFiltro)
    refreshPage()
  }

  useEffect(() => {
    if (deleteData) {
      console.log(deleteData)
      alertToast(true, toast, 'error', deleteFiltro, deleteData.idProducto, refreshPage, 'Filtro eliminado', 'El filtro ha sido eliminado correctamente')
    }
  }, [deleteData])

  const refreshPage = () => {
    window.location.reload()
  }

  return {
    newFiltro,
    handleChange,
    handleSubmit,
    handleEdit,
    setDeleteData,
    handleBlur,
    validationFields
  }
}
