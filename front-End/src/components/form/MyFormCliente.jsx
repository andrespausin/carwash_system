import MyInput from './components/MyInput'
import MyFormTemplate from './components/MyFormTemplate'
import MyFormDivisor from './components/MyFormDivisor.jsx'
import MyButtonForm from './components/MyButtonForm.jsx'
import { useNewClient } from '../../hooks/form/useNewCliente.js'

const MyFormCliente = ({ editData = null, bg = true }) => {
  console.log(editData)
  const { handleSubmit, newClient, handleChange, handleEdit, handleBlur, validationFields } = useNewClient(editData)
  console.log(newClient)
  return (
    <MyFormTemplate bg={bg}>
      <MyFormDivisor title='Datos del cliente'>
        <MyInput label='Nombre' placeholder={editData ? editData.nombre : 'Juan Pérez'} id='nombre' valueControl={newClient.nombre} onChange={handleChange} onBlur={handleBlur} validationField={validationFields.nombre} />
      </MyFormDivisor>
      <MyInput label='Cédula o Rif' placeholder={editData ? editData.idCliente : 'V-12345678'} id='idCliente' valueControl={newClient.cedula} onChange={handleChange} onBlur={handleBlur} validationField={validationFields.idCliente} />
      <MyInput label='Telefono' type='tel' placeholder={editData ? editData.telefono : '4121234567'} id='telefono' valueControl={newClient.telefono} onChange={handleChange} onBlur={handleBlur} validationField={validationFields.telefono} />
      <MyInput label='Correo' placeholder={editData ? editData.email : 'example@mail.com'} id='email' valueControl={newClient.correo} onChange={handleChange} onBlur={handleBlur} validationField={validationFields.email} />
      <MyInput label='Dirección' placeholder={editData ? editData.direccion : 'Naguanagua'} id='direccion' valueControl={newClient.direccion} onChange={handleChange} onBlur={handleBlur} validationField={validationFields.email} />
      <MyButtonForm onClick={editData ? handleEdit : handleSubmit} label={editData ? 'Guardar cambios' : 'Registrar Cliente'} />
    </MyFormTemplate>
  )
}

export default MyFormCliente
