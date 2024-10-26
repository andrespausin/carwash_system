import { Heading, Stack } from '@chakra-ui/react'
import { usePedido } from '../../hooks/pedido/usePedido.js'
import MyTable from '../tables/MyTable.jsx'

const COLUMNS = [
  { key: 'idPedido', name: 'Pedido' },
  { key: 'nombre', name: 'Cliente' },
  { key: 'placa', name: 'Nota' },
  { key: 'marca', name: 'Marca' },
  { key: 'modelo', name: 'Modelo' },
  { key: 'tipoServicio', name: 'Tipo de servicio' },
  { key: 'precio', name: 'Precio' },
  { key: 'fecha', name: 'Fecha' }
]

const ServiciosView = () => {
  const { servicios } = usePedido()
  console.log(servicios)
  return (
    <Stack alignItems='center'>
      <Heading m={5} size='xl' fontWeight='extrabold'>
        TABLA DE SERVICIOS DE LAVADO
      </Heading>
      <MyTable data={servicios} columns={COLUMNS} title='Visualización de los servicios' idRow='placa' action={false} />
    </Stack>
  )
}

export default ServiciosView
