import { Heading, Stack } from '@chakra-ui/react'
import { usePedido } from '../../hooks/pedido/usePedido.js'
import { useNewInventario } from '../../hooks/form/useNewInventario.js'
import MyTable from '../tables/MyTable.jsx'
import { useState } from 'react'
import MyFormAceite from '../form/MyFormAceite.jsx'
import MyFormFiltro from '../form/MyFormFiltro.jsx'

const COLUMNS = [
  { key: 'idCategoria', name: 'Categoría' },
  { key: 'idProducto', name: 'ID Producto' },
  { key: 'marca', name: 'Marca' },
  { key: 'tipo', name: 'Tipo' },
  { key: 'stock_min', name: 'Stock mínimo' },
  { key: 'stock_max', name: 'Stock máximo' },
  { key: 'stock_actual', name: 'Stock actual' }
]

const InventarioView = () => {
  const { inventario } = usePedido()
  const [editData, setEditData] = useState({})
  const { setDeleteData } = useNewInventario()
  return (
    <Stack alignItems='center'>
      <Heading m={5} size='xl' fontWeight='extrabold'>
        TABLA DE INVENTARIO
      </Heading>
      <MyTable data={inventario} columns={COLUMNS} setDeleteData={setDeleteData} title='Visualización del inventario de filtros y aceites' idRow='idProducto' inventoryMode setEditData={setEditData}>
        {editData && editData.idCategoria === 'F'
          ? <MyFormFiltro editData={editData} />
          : editData && editData.idCategoria === 'A'
            ? <MyFormAceite editData={editData} />
            : null}
      </MyTable>
    </Stack>
  )
}

export default InventarioView
