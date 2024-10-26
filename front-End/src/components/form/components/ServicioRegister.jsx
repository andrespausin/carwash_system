import React, { useState } from 'react'
import './css/servicioComponent.css'
import { TIPO_LAVADO } from '../../../constants.js'
import { useRegister } from '../../../hooks/pedido/useRegister.js'
import {
  Box,
  Stack,
  Heading,
  Input,
  Select,
  StackDivider,
  FormControl,
  FormLabel
} from '@chakra-ui/react'

const ServicioRegister = ({ allService, i }) => {
  const [servicio, setServicio] = useState({
    placa: '',
    marca: '',
    modelo: '',
    monto: '',
    tipoLavado: ''
  })

  console.log(i)

  const { handleChange, handleBlur } = useRegister(allService, servicio, setServicio, null, i)
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
            Servicio de autos
          </Heading>
          <Stack>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Nota</FormLabel>
                <Input onChange={handleChange} onBlur={handleBlur} value={servicio.placa} id='placa' type='text' />
              </FormControl>
            </Box>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Marca</FormLabel>
                <Input onChange={handleChange} onBlur={handleBlur} value={servicio.marca} id='marca' type='text' />
              </FormControl>
            </Box>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Modelo</FormLabel>
                <Input onChange={handleChange} onBlur={handleBlur} value={servicio.modelo} id='modelo' type='text' />
              </FormControl>
            </Box>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Tipo de Servicio</FormLabel>
                <Select placeholder='Seleccione un tipo de lavado' onChange={handleChange} onBlur={handleBlur} value={servicio.tipoLavado} id='tipoLavado' type='text'>
                  {TIPO_LAVADO.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box p={2}>
              <FormControl id='lastName'>
                <FormLabel fontWeight='semibold'>Monto</FormLabel>
                <Input onChange={handleChange} onBlur={handleBlur} value={servicio.monto} id='monto' type='text' />
              </FormControl>
            </Box>
          </Stack>

        </Stack>
      </Stack>

    </Box>
  )
}

export default ServicioRegister
