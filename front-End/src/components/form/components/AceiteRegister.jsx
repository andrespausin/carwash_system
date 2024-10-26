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
  Select,
  Checkbox,
  useColorModeValue
} from '@chakra-ui/react'
// allObject, object, setObject, objectDB = null
const AceiteRegister = ({ allAceites, i }) => {
  const { aceites } = usePedido()
  const [newAceite, setNewAceite] = useState({ idProducto: '', cantidad: '', precio: '', empaque: false, descripcion: '' })
  const { handleChangeAceite, handleBlur, maxCantidad } = useRegister(allAceites, newAceite, setNewAceite, aceites, i)
  return (
    <Box
      p={8}
      rounded='lg'
      bg='background.bg'
      shadow='lg'
      mb={10}
    >
      <Stack spacing={4}>
        <Stack divider={<StackDivider borderColor={useColorModeValue('black.100', 'black.700')} />} spacing={4}>
          <Heading size='lg' fontWeight='bold' fontStyle='italic'>
            Aceites
          </Heading>
          <Stack>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Nota</FormLabel>
                <Input onChange={handleChangeAceite} onBlur={handleBlur} value={newAceite.descripcion} id='descripcion' type='text' />
              </FormControl>
            </Box>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Aceite</FormLabel>
                <Select placeholder='Seleccione una opción' onChange={handleChangeAceite} onBlur={handleBlur} value={newAceite.idProducto} id='idProducto' type='text'>
                  {aceites
                    ? aceites.map((aceite) =>
                      (<option key={aceite.idProducto} value={aceite.idProducto}>{`${aceite.idProducto}: ${aceite.marca} ${aceite.viscosidad} ${aceite.tipo}`}</option>))
                    : null}
                </Select>
              </FormControl>
            </Box>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Cantidad</FormLabel>
                <Input onChange={handleChangeAceite} onBlur={handleBlur} value={newAceite.cantidad} id='cantidad' type='number' max={maxCantidad} />
              </FormControl>
            </Box>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Precio</FormLabel>
                <Input onChange={handleChangeAceite} onBlur={handleBlur} value={newAceite.precio} id='precio' type='text' />
              </FormControl>
            </Box>
            <Box p={2}>
              <FormControl id='lastName'>
                <Checkbox onChange={handleChangeAceite} onBlur={handleBlur} value={newAceite.empaque} id='empaque' size='lg'> Empaque </Checkbox>
              </FormControl>
            </Box>

          </Stack>

        </Stack>
      </Stack>

    </Box>
  )
}

export default AceiteRegister
