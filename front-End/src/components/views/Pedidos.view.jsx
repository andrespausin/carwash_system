// import { useEffect } from 'react'
import MyFormPedido from '../form/MyFormPedido'
import { Stack, Heading } from '@chakra-ui/react'

const PedidosView = () => {
  return (
    <Stack alignItems='center'>
      <Heading m={5} size='xl' fontWeight='extrabold'>
        REGISTRO DE PEDIDOS
      </Heading>
      <MyFormPedido />
    </Stack>
  )
}

export default PedidosView
