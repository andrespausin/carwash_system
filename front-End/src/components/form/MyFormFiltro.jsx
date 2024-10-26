import MyBoxFormField from './components/MyBoxFormField'
import MyInput from './components/MyInput'
import MyFormTemplate from './components/MyFormTemplate'
import MyFormDivisor from './components/MyFormDivisor.jsx'
import MyButtonForm from './components/MyButtonForm.jsx'
import MySelect from './components/MySelect.jsx'
import MyTextArea from './components/MyTextArea.jsx'
import { TIPO_FILTROS } from '../../constants.js'
import { useNewFiltro } from '../../hooks/form/useNewFiltros.js'

const MyFormFiltro = ({ editData }) => {
  const { handleSubmit, newFiltro, handleChange, handleEdit, handleBlur, validationFields } = useNewFiltro(editData)
  return (
    <MyFormTemplate bg={!editData}>
      <MyFormDivisor title='Datos del filtro'>
        <MyBoxFormField type='double' proportion={['50%', '50%']}>
          <MyInput label='Codigo del aceite' placeholder={editData ? editData.idProducto : 'ACEITE-BOSCH'} id='idProducto' valueControl={newFiltro.idProducto} onChange={handleChange} onBlur={handleBlur} validationField={validationFields.idProducto} />
          <MyInput label='Marca' placeholder={editData ? editData.marca : 'BOSCH'} id='marca' valueControl={newFiltro.marca} onChange={handleChange} onBlur={handleBlur} validationField={validationFields.marca} />
        </MyBoxFormField>
      </MyFormDivisor>
      <MySelect label='Tipo' placeholder={editData ? editData.tipo : 'Seleccione una opción'} id='tipo' valueControl={newFiltro.tipo} onChange={handleChange} options={TIPO_FILTROS} />
      <MyTextArea label='Modelos de vehículos' placeholder={editData ? editData.modelo_vehiculo : 'Aveo, Optra, Fiesta Power'} id='modeloVehiculo' valueControl={newFiltro.modeloVehiculo} onChange={handleChange} onBlur={handleBlur} validationField={validationFields.modeloVehiculo} />
      <MyFormDivisor title='Precios del filtro'>
        <MyBoxFormField type='double' proportion={['50%', '50%']}>
          <MyInput label='Precio de compra' placeholder={editData ? editData.precioCompra : '0'} id='precioCompra' valueControl={newFiltro.precioCompra} onChange={handleChange} type='number' onBlur={handleBlur} validationField={validationFields.precioCompra} />
          <MyInput label='Precio de venta' placeholder={editData ? editData.precioVenta : '0'} id='precioVenta' valueControl={newFiltro.precioVenta} onChange={handleChange} type='number' onBlur={handleBlur} validationField={validationFields.precioVenta} />
        </MyBoxFormField>
      </MyFormDivisor>
      <MyFormDivisor title='Inventario'>
        <MyBoxFormField type='triple' proportion={['33%', '33%, 33%']}>
          <MyInput label='Stock Mínimo' placeholder={editData ? editData.stock_min : '0'} id='stockMin' valueControl={newFiltro.stockMin} onChange={handleChange} type='number' onBlur={handleBlur} validationField={validationFields.stockMin} />
          <MyInput label='Stock Máximo' placeholder={editData ? editData.stock_max : '0'} id='stockMax' valueControl={newFiltro.stockMax} onChange={handleChange} type='number' onBlur={handleBlur} validationField={validationFields.stockMax} />
          <MyInput label='Stock Actual' placeholder={editData ? editData.stock_actual : '0'} id='stockActual' valueControl={newFiltro.stockActual} onChange={handleChange} type='number' onBlur={handleBlur} validationField={validationFields.stockActual} />
        </MyBoxFormField>
      </MyFormDivisor>
      <MyButtonForm onClick={editData ? handleEdit : handleSubmit} label={editData ? 'Guardar cambios' : 'Registrar Aceite'} />
    </MyFormTemplate>
  )
}

export default MyFormFiltro
