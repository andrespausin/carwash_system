import { useEffect, useState } from 'react'
import { deleteCliente, updateCliente, createCliente } from '../../service/cliente.js'
import { ValidationForm, ValidationSubmit } from '../utils/validationForm.js'
import { useToast } from '@chakra-ui/react'
import { alertToast, alertToastCliente } from '../toast/alertToast.js'

export const useNewClient = (editData) => {
  editData
    ? editData = [editData].map((cliente) => {
      return {
        id: cliente.id,
        idCliente: cliente.idCliente,
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        email: cliente.email,
        direccion: cliente.direccion
      }
    })[0]
    : editData = null
  const [newClient, setNewClient] = useState(!editData
    ? ({
        id: '',
        idCliente: '',
        nombre: '',
        telefono: '',
        email: '',
        direccion: ''
      })
    : {})

  const [deleteData, setDeleteData] = useState(null)
  const toast = useToast()
  const [validationFields, setValidationFields] = useState({
    idCliente: { isInvalid: false, message: '', isSubmitted: true },
    nombre: { isInvalid: false, message: '', isSubmitted: false },
    telefono: { isInvalid: false, message: '', isSubmitted: true },
    email: { isInvalid: false, message: '', isSubmitted: true },
    direccion: { isInvalid: false, message: '', isSubmitted: true }
  })

  const handleChange = (e) => {
    setNewClient({
      ...newClient,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newClient)
    alertToastCliente({
      condition: ValidationSubmit(validationFields),
      toast,
      onSuccessMethod: createCliente,
      object: newClient,
      refreshPage
    })
  }

  const handleBlur = (e) => {
    const { id } = e.target
    setValidationFields({
      ...validationFields,
      [id]: ValidationForm({ id, value: e.target.value })
    })
  }

  const handleEdit = (e) => {
    console.log(newClient)
    console.log(editData)
    e.preventDefault()
    updateCliente(editData.id, newClient)
    refreshPage()
  }

  useEffect(() => {
    if (deleteData) {
      alertToast(true, toast, 'error', deleteCliente, deleteData.idCliente, refreshPage, 'Cliente eliminado', 'El cliente ha sido eliminado correctamente')
    }
  }, [deleteData])

  const refreshPage = () => {
    window.location.reload()
  }

  return {
    newClient,
    handleChange,
    handleSubmit,
    handleEdit,
    setDeleteData,
    handleBlur,
    validationFields
  }
}
