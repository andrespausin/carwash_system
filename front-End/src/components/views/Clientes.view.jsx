import { useState } from 'react'
import { Heading, Stack } from '@chakra-ui/react'
import { usePedido } from '../../hooks/pedido/usePedido.js'
import MyTable from '../tables/MyTable.jsx'
import MyFormCliente from '../form/MyFormCliente.jsx'
import { useNewClient } from '../../hooks/form/useNewCliente.js'
import { COLUMNS_CLIENTES } from '../../constants.js'

const ClientesView = () => {
  const { clientes } = usePedido()
  const [editData, setEditData] = useState({})
  const { setDeleteData } = useNewClient()
  return (
    <Stack alignItems='center'>
      <Heading m={5} size='xl' fontWeight='extrabold'>
        REGISTRO DE CLIENTES
      </Heading>
      <MyFormCliente />
      <Heading m={5} size='xl' fontWeight='extrabold'>
        TABLA DE CLIENTES
      </Heading>
      <MyTable data={clientes} columns={COLUMNS_CLIENTES} title='Visualización de los clientes' idRow='id' setEditData={setEditData} setDeleteData={setDeleteData}>
        <MyFormCliente bg={false} editData={editData} />
      </MyTable>
    </Stack>
  )
}

export default ClientesView
