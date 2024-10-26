import { useState } from 'react'
import { useNewFiltro } from '../../hooks/form/useNewFiltros.js'
import { Heading, Stack } from '@chakra-ui/react'
import { usePedido } from '../../hooks/pedido/usePedido.js'
import MyFormFiltro from '../form/MyFormFiltro.jsx'
import MyTable from '../tables/MyTable.jsx'

const COLUMNS = [
  { key: 'idProducto', name: 'ID' },
  { key: 'marca', name: 'Marca' },
  { key: 'tipo', name: 'Tipo' },
  { key: 'modelo_vehiculo', name: 'Modelo del vehículo' },
  { key: 'precioCompra', name: 'Precio compra' },
  { key: 'precioVenta', name: 'Precio venta' }
]

const FiltrosView = () => {
  const { filtros } = usePedido()
  const [editData, setEditData] = useState({})
  const { setDeleteData } = useNewFiltro()
  return (
    <Stack alignItems='center'>
      <Heading m={5} size='xl' fontWeight='extrabold'>
        REGISTRO DE FILTROS
      </Heading>
      <MyFormFiltro />
      <Heading m={5} size='xl' fontWeight='extrabold'>
        TABLA DE FILTROS
      </Heading>
      <MyTable data={filtros} columns={COLUMNS} title='Visualización de los filtros' idRow='idProducto' setEditData={setEditData} setDeleteData={setDeleteData}>
        <MyFormFiltro editData={editData} />
      </MyTable>
    </Stack>
  )
}

export default FiltrosView
