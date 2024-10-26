import { Heading, Stack } from '@chakra-ui/react'
import { usePedido } from '../../hooks/pedido/usePedido.js'
import MyTable from '../tables/MyTable'
import { useState } from 'react'
import MyFormAceite from '../form/MyFormAceite.jsx'
import { useNewAceite } from '../../hooks/form/useNewAceite.js'
import { COLUMNS_ACEITES } from '../../constants.js'

const AceitesView = () => {
  const { aceites } = usePedido()
  const [editData, setEditData] = useState({})
  const { setDeleteData } = useNewAceite()

  return (
    <Stack alignItems='center'>
      <Heading m={5} size='xl' fontWeight='extrabold'>
        REGISTRO DE ACEITES Y MATERIALES
      </Heading>
      <MyFormAceite />
      <Heading m={5} size='xl' fontWeight='extrabold'>
        TABLA DE ACEITES Y MATERIALES
      </Heading>
      <MyTable data={aceites} columns={COLUMNS_ACEITES} title='Visualización de los aceites' idRow='idProducto' setEditData={setEditData} setDeleteData={setDeleteData}>
        <MyFormAceite bg={false} editData={editData} />
      </MyTable>
    </Stack>
  )
}

export default AceitesView
