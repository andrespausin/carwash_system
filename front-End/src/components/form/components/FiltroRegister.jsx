// import Input from '../../form/components/Input'
// import InputFiltro from '../../form/components/InputFiltro'
import { useRegister } from '../../../hooks/pedido/useRegister'
import { usePedido } from '../../../hooks/pedido/usePedido.js'
import { useState } from 'react'
import {
  Box,
  Stack,
  Heading,
  Input,
  StackDivider,
  FormControl,
  FormLabel,
  Select
} from '@chakra-ui/react'
const FiltroRegister = ({ allNewFilters, i }) => {
  const { filtros } = usePedido()
  const [newFiltro, setNewFiltro] = useState({ idProducto: '', cantidad: '', precio: '', descripcion: '' })
  const { handleChangeFiltro, handleBlur } = useRegister(allNewFilters, newFiltro, setNewFiltro, filtros, i)
  return (
    <Box
      p={8}
      rounded='lg'
      bg='background.bg'
      shadow='lg'
      mb={10}
    >
      <Stack spacing={4}>
        <Stack divider={<StackDivider borderColor='background.border' />} spacing={4}>
          <Heading size='lg' fontWeight='bold' fontStyle='italic'>
            Filtros
          </Heading>
          <Stack>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Nota</FormLabel>
                <Input onChange={handleChangeFiltro} onBlur={handleBlur} value={newFiltro.descripcion} id='descripcion' type='text' />
              </FormControl>
            </Box>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Filtro</FormLabel>
                <Select placeholder='Seleccione una opción' onChange={handleChangeFiltro} onBlur={handleBlur} value={newFiltro.idProducto} id='idProducto' type='text'>
                  {filtros
                    ? filtros.map((filtro) =>
                      (<option key={filtro.idProducto} value={filtro.idProducto}>{`${filtro.idProducto}: ${filtro.tipo} - marca - ${filtro.marca}`}</option>))
                    : null}
                </Select>
              </FormControl>
            </Box>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Cantidad</FormLabel>
                <Input onChange={handleChangeFiltro} onBlur={handleBlur} value={newFiltro.cantidad} id='cantidad' type='number' />
              </FormControl>
            </Box>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Precio</FormLabel>
                <Input onChange={handleChangeFiltro} onBlur={handleBlur} value={newFiltro.precio} id='precio' type='text' />
              </FormControl>
            </Box>
          </Stack>

        </Stack>
      </Stack>

    </Box>
  )
}

export default FiltroRegister
