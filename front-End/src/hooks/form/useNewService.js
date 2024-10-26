import { useState } from 'react'
import { createServicio } from '../../service/washservice.js'
import { ValidationForm } from '../utils/validationForm.js'

export const useNewService = () => {
  const [newService, setNewService] = useState({
    placa: '',
    fecha: '',
    tipoServicio: '',
    marca: '',
    modelo: '',
    precio: 0,
    idCliente: ''
  })

  const handleChange = (e) => {
    setNewService({
      ...newService,
      [e.target.id]: e.target.value
    })
  }

  const handleBlur = (e) => {
    const { id } = e.target
    ValidationForm({ id, type: 'A', value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newService)
    if (newService.idCliente === '' ||
      newService.tipoServicio === '' ||
      newService.placa === '' ||
      newService.fecha === '' ||
      newService.marca === '' ||
      newService.modelo === '' ||
      newService.precio === '') {
      window.alert('Debe llenar todos los campos')
      return
    }
    createServicio(newService)
    refreshPage()
  }

  const refreshPage = () => {
    window.location.reload()
  }

  return {
    newService,
    handleChange,
    handleSubmit,
    handleBlur
  }
}
