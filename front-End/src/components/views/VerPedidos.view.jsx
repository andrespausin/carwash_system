import { Heading, Stack } from '@chakra-ui/react'
import { usePedido } from '../../hooks/pedido/usePedido.js'
import MyTablePedido from '../tables/MyTablePedido.jsx'

const VerPedidosView = () => {
  const { pedidos } = usePedido()
  return (
    <Stack alignItems='center'>
      <Heading m={5} size='xl' fontWeight='extrabold'>
        TABLA DE PEDIDOS
      </Heading>
      <MyTablePedido data={pedidos} />
    </Stack>
  )
}

export default VerPedidosView
