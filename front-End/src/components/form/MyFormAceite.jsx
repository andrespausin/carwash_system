import MyBoxFormField from './components/MyBoxFormField'
import MyInput from './components/MyInput'
import MyFormTemplate from './components/MyFormTemplate'
import MyFormDivisor from './components/MyFormDivisor.jsx'
import MyButtonForm from './components/MyButtonForm.jsx'
import MySelect from './components/MySelect.jsx'
import { TIPO_ACEITES } from '../../constants.js'
import { useNewAceite } from '../../hooks/form/useNewAceite.js'

const MyFormAceite = ({ editData }) => {
  const { handleSubmit, newAceite, handleChange, handleEdit, handleBlur, validationFields } = useNewAceite(editData)
  return (
    <MyFormTemplate bg={!editData}>
      <MyFormDivisor title='Datos del producto'>
        <MyBoxFormField type='double' proportion={['50%', '50%']}>
          <MyInput validationField={validationFields.idProducto} label='Codigo del producto' placeholder={editData ? editData.idProducto : 'CAS15W50'} id='idProducto' onBlur={handleBlur} valueControl={newAceite.idProducto} onChange={handleChange} />
          <MyInput validationField={validationFields.marca} label='Marca' placeholder={editData ? editData.marca : 'Castrol'} id='marca' valueControl={newAceite.marca} onChange={handleChange} onBlur={handleBlur} />
        </MyBoxFormField>
      </MyFormDivisor>
      <MySelect label='Tipo' placeholder={editData ? editData.tipo : 'Seleccione una opción'} id='tipo' valueControl={newAceite.tipo} onChange={handleChange} onBlur={handleBlur} options={TIPO_ACEITES} validationField={validationFields.tipo} />
      <MyInput validationField={validationFields.viscosidad} label='Descripción' placeholder={editData ? editData.viscosidad : '15W40'} id='viscosidad' valueControl={newAceite.viscosidad} onChange={handleChange} onBlur={handleBlur} />
      <MyInput validationField={validationFields.unidadPorEmpaque} label='Unidad por empaque' type='number' placeholder={editData ? editData.unidad_por_empaque : '0'} id='unidadPorEmpaque' valueControl={newAceite.unidadPorEmpaque} onChange={handleChange} onBlur={handleBlur} />
      <MyFormDivisor title='Precios de compra'>
        <MyBoxFormField type='double' proportion={['50%', '50%']}>
          <MyInput validationField={validationFields.precioCompraEmpaque} label='Por empaque' placeholder={editData ? editData.precio_compra_empaque : '0'} id='precioCompraEmpaque' valueControl={newAceite.precioCompraEmpaque} onChange={handleChange} onBlur={handleBlur} type='number' />
          <MyInput label='Por unidad' placeholder={editData ? editData.precio_compra_unidad : '0'} id='precioCompraUnidad' valueControl={newAceite.precioCompraUnidad} onChange={handleChange} onBlur={handleBlur} type='number' isReadOnly />
        </MyBoxFormField>
      </MyFormDivisor>
      <MyFormDivisor title='Precios de venta'>
        <MyBoxFormField type='double' proportion={['50%', '50%']}>
          <MyInput validationField={validationFields.precioVentaEmpaque} label='Por empaque' placeholder={editData ? editData.precio_venta_empaque : '0'} id='precioVentaEmpaque' valueControl={newAceite.precioVentaEmpaque} onChange={handleChange} onBlur={handleBlur} type='number' />
          <MyInput validationField={validationFields.precioVentaUnidad} label='Por unidad' placeholder={editData ? editData.precio_venta_unidad : '0'} id='precioVentaUnidad' valueControl={newAceite.precioVentaUnidad} onChange={handleChange} type='number' onBlur={handleBlur} />
        </MyBoxFormField>
      </MyFormDivisor>
      <MyFormDivisor title='Inventario'>
        <MyBoxFormField type='triple' proportion={['33%', '33%, 33%']}>
          <MyInput validationField={validationFields.stockMin} label='Stock Mínimo' placeholder={editData ? editData.stock_min : '0'} id='stockMin' valueControl={newAceite.stockMin} onChange={handleChange} onBlur={handleBlur} type='number' />
          <MyInput validationField={validationFields.stockMax} label='Stock Máximo' placeholder={editData ? editData.stock_max : '0'} id='stockMax' valueControl={newAceite.stockMax} onChange={handleChange} onBlur={handleBlur} type='number' />
          <MyInput validationField={validationFields.stockActual} label='Stock Actual' placeholder={editData ? editData.stock_actual : '0'} id='stockActual' valueControl={newAceite.stockActual} onChange={handleChange} onBlur={handleBlur} type='number' />
        </MyBoxFormField>
      </MyFormDivisor>
      <MyButtonForm onClick={editData ? handleEdit : handleSubmit} label={editData ? 'Guardar cambios' : 'Registrar Producto'} />
    </MyFormTemplate>

  )
}

export default MyFormAceite
