import { getAllAceitesId } from '../../service/aceites'
import { getAllFiltrosId } from '../../service/filtros'
import { getAllClientesId } from '../../service/cliente'

const allAceitesId = await getAllAceitesId()

const allFiltrosId = await getAllFiltrosId()

const allClientesId = await getAllClientesId()

// El type puede ser, o aceite, o filtro.
export const ValidationForm = ({ id, type, value, options = null }) => {
  let result = {}
  switch (id) {
    case 'idProducto' :
      switch (type) {
        case 'A' :
          if (allAceitesId.includes(value)) {
            result = { isInvalid: true, message: 'El id ya se encuentra registrado', isSubmitted: false }
          } else if (value === '') {
            result = { isInvalid: true, message: 'Este campo es obligatorio', isSubmitted: false }
          } else {
            result = { isInvalid: false, message: '', isSubmitted: true }
          }
          break
        case 'F' :
          if (allFiltrosId.includes(value)) {
            result = { isInvalid: true, message: 'El id ya se encuentra registrado', isSubmitted: false }
          } else if (value === '') {
            result = { isInvalid: true, message: 'Este campo es obligatorio', isSubmitted: false }
          } else {
            result = { isInvalid: false, message: '', isSubmitted: true }
          }
          break
      }
      return result
    case 'idCliente' :
      if (allClientesId.includes(value)) {
        result = { isInvalid: true, message: 'La cédula ya se encuentra registrada', isSubmitted: false }
      } else if (value.trim() === '') {
        result = { isInvalid: false, message: '', isSubmitted: true }
      } else if (value.trim().length < 7) {
        result = { isInvalid: true, message: 'El id debe tener al menos 7 dígitos', isSubmitted: false }
      } else {
        result = { isInvalid: false, message: '', isSubmitted: true }
      }
      break
    case 'nombre' :
      if (value.length < 3) {
        result = { isInvalid: true, message: 'El nombre debe tener al menos 3 caracteres', isSubmitted: false }
      } else if (value === '') {
        result = { isInvalid: true, message: 'Este campo es obligatorio', isSubmitted: false }
      } else if (!value.match(/[^\s]+[a-zA-ZÑñ\p{L}0-9.,]+[^\s]+$/)) {
        result = { isInvalid: true, message: 'El nombre no puede contener caracteres alfanuméricos ni culminar en espacios.', isSubmitted: false }
      } else {
        result = { isInvalid: false, message: '', isSubmitted: true }
      }
      break
    case 'email' :
      if (value === '') {
        result = { isInvalid: false, message: '', isSubmitted: true }
      } else if (!String(value).match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        result = { isInvalid: true, message: 'Ingrese un correo válido', isSubmitted: false }
      } else {
        result = { isInvalid: false, message: '', isSubmitted: true }
      }
      break
    case 'telefono' :
      if (value === '') {
        result = { isInvalid: false, message: '', isSubmitted: true }
      } else if (value.length < 10) {
        result = { isInvalid: true, message: 'El teléfono debe tener 10 dígitos', isSubmitted: false }
      } else if (value.match(/[a-z]/i)) {
        result = { isInvalid: true, message: 'El teléfono no puede contener letras', isSubmitted: false }
      } else if (!value.match(/^0|(?:4(?:1[246]|2[46]))\d{7}$/)) {
        result = { isInvalid: true, message: 'El teléfono no es válido', isSubmitted: false }
      } else {
        result = { isInvalid: false, message: '', isSubmitted: true }
      }
      break
    case 'unidadPorEmpaque' :
      if (value === '') {
        result = { isInvalid: true, message: 'Este campo es obligatorio', isSubmitted: false }
      } else if (value.match(/[a-z]/i)) {
        result = { isInvalid: true, message: 'La unidad por empaque no puede contener letras', isSubmitted: false }
      } else if (value === '0') {
        result = { isInvalid: true, message: 'La unidad por empaque no puede ser 0', isSubmitted: false }
      } else {
        result = { isInvalid: false, message: '', isSubmitted: true }
      }
      break
    default :
      if (value === '') {
        result = { isInvalid: true, message: 'Este campo es obligatorio', isSubmitted: false }
      } else {
        result = { isInvalid: false, message: '', isSubmitted: true }
      }
      break
  }
  return result
}

export const ValidationSubmit = (ValidationFields) => {
  console.log(ValidationFields)
  let result = true
  Object.keys(ValidationFields).forEach((key) => {
    if (ValidationFields[key].isSubmitted === false) {
      result = result && false
    }
  })
  console.log(result)
  return result
}
