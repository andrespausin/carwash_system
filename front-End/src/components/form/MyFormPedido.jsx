import React, { useState } from 'react'
// import Input from './components/Input.jsx'
// import Button from './components/Button.jsx'
import ServicioRegister from './components/ServicioRegister.jsx'
import AceiteRegister from './components/AceiteRegister.jsx'
import FiltroRegister from './components/FiltroRegister.jsx'
import './formPedidos.css'
import { usePedido } from '../../hooks/pedido/usePedido.js'
import FormModal from './modals/FormModal.jsx'

import { FiPlus } from 'react-icons/fi'

import ModalFormClient from './MyFormCliente.jsx'

import {
  Grid,
  GridItem,
  Heading,
  Input,
  Button,
  StackDivider,
  Box,
  Stack,
  FormControl,
  FormLabel,
  HStack,
  useColorModeValue,
  Select,
  Checkbox,
  useToast
} from '@chakra-ui/react'
import { useFormularioPedido } from '../../hooks/pedido/useFormularioPedido.js'
import MyInput from './components/MyInput.jsx'
import { alertToast } from '../../hooks/toast/alertToast.js'

const MyFormPedido = () => {
  const {
    setAbonoAlert,
    newEncabezadoPedido,
    setNewEncabezadoPedido,
    allService,
    allAceites,
    allNewFilters,
    handleSubmit,
    calculateMonto
  } = useFormularioPedido()
  return (
    <>
      <FormularioCliente setNewEncabezadoPedido={setNewEncabezadoPedido} newEncabezadoPedido={newEncabezadoPedido} /><br />
      <Grid templateColumns='repeat(3, 1fr)' gap={20}>
        <GridItem w='100%' h='fit'>
          <FormularioLavado allService={allService} />
        </GridItem>
        <GridItem w='100%' h='fit'>
          <FormularioAceite allAceites={allAceites} />
        </GridItem>
        <GridItem w='100%' h='fit'>
          <FormularioFiltro allNewFilters={allNewFilters} />
        </GridItem>
      </Grid>
      <Stack
        rounded='lg'
        bg='background.bg'
        boxShadow='lg'
        p={8}
        mb={4}
      >
        <Options newEncabezadoPedido={newEncabezadoPedido} setNewEncabezadoPedido={setNewEncabezadoPedido} setAbonoAlert={setAbonoAlert} calculateMonto={calculateMonto} />

        <Button
          w='100%'
          onClick={handleSubmit}
          loadingText='Registrando...'
          size='lg'
          bg='primary.100'
          color='white'
          _hover={{
            bg: 'blue.500'
          }}
        >
          Registrar Pedido
        </Button>
      </Stack>
    </>
  )
}

// Componente que contiene un boton que indica si el pedido fue cancelado o no
const Options = ({ setNewEncabezadoPedido, newEncabezadoPedido, setAbonoAlert, calculateMonto }) => {
  const [pagado, setPagado] = useState(false)
  const montoTotal = calculateMonto()
  console.log(montoTotal)
  const toast = useToast()
  const onChangePagado = (e) => {
    setPagado(e.target.checked)
    if (e.target.checked) {
      setAbonoAlert(false)
    } else {
      setAbonoAlert(true)
    }
  }
  const onChange = (e) => {
    const { value } = e.target
    if (value !== '' && montoTotal !== 0 && parseFloat(value).toFixed(2) > montoTotal) {
      alertToast(true, toast, 'warning', null, null, null, 'ADVERTENCIA', 'El monto abonado no puede ser mayor al monto total', 5000)
      setNewEncabezadoPedido({
        ...newEncabezadoPedido,
        abono: parseFloat(montoTotal).toFixed(2)
      })
      return
    }
    if (value.includes('.') && value.split('.')[1].length > 2) {
      setNewEncabezadoPedido({
        ...newEncabezadoPedido,
        abono: parseFloat(value).toFixed(2)
      })
    }
    if (value === '') {
      setNewEncabezadoPedido({
        ...newEncabezadoPedido,
        abono: 0
      })
    }
    setNewEncabezadoPedido({
      ...newEncabezadoPedido,
      abono: parseFloat(value)
    })
  }
  return (
    <HStack>
      <Checkbox size='lg' onChange={onChangePagado}> Pagado </Checkbox>
      {!pagado ? <Input label='Monto abonado' variant='flushed' value={newEncabezadoPedido.abono} onChange={onChange} type='number' /> : null}
    </HStack>

  )
}
// CHECK
const FormularioCliente = ({ setNewEncabezadoPedido, newEncabezadoPedido }) => {
  const { clientes } = usePedido()
  // MUESTRA CLIENTES DE DB console.log(clientes)
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)
  const handleChange = (e) => {
    e.target.id === 'fecha' ? setNewEncabezadoPedido({ ...newEncabezadoPedido, fecha: e.target.value }) : setNewEncabezadoPedido({ ...newEncabezadoPedido, idCliente: e.target.value })
    console.log(e.target.value)
  }
  return (
    <Box
      w='30%'
      rounded='lg'
      bg='background.bg'
      boxShadow='lg'
      p={8}
      mb={10}
    >
      <Stack spacing={4}>
        <Stack divider={<StackDivider borderColor={useColorModeValue('black.100', 'black.700')} />} spacing={4}>
          <Heading size='lg' fontWeight='bold' fontStyle='italic'>
            Datos del Pedido
          </Heading>
          <Box>
            <FormControl id='lastName' mb='30px'>
              <FormLabel fontWeight='semibold'>Cliente</FormLabel>
              <Select variant='filled' placeholder='Seleccione un cliente' onChange={handleChange} value={newEncabezadoPedido.idCliente} id='marca' type='text'>
                {clientes
                  ? clientes.map((cliente) =>
                    (<option key={cliente.idCliente} value={cliente.idCliente}>{cliente.nombre}</option>))
                  : null}
              </Select>
            </FormControl>
            <MyInput id='fecha' type='date' label='Fecha' onChange={handleChange} value={newEncabezadoPedido.fecha} />
          </Box>
        </Stack>
        <Stack spacing={10} mt={8} pt={2} alignItems='flex-end'>
          <Button
            w='auto'
            rounded='full'
            loadingText='Registrando'
            leftIcon={<FiPlus />}
            size='lg'
            bg='primary.100'
            color='white'
            _hover={{
              bg: 'blue.500'
            }}
            onClick={toggleOpen}
          >
            Cliente
          </Button>
        </Stack>
        <FormModal isOpen={isOpen} onClose={toggleOpen}>
          <ModalFormClient bg={false} />
        </FormModal>
      </Stack>

    </Box>
  )
}

// CHECK
const FormularioLavado = ({ allService }) => {
  const [cantidadLavados, setCantidadLavados] = useState(1)
  // MUESTRA REF ALLSERVICE console.log(allService.current)
  const agregarLavado = () => {
    setCantidadLavados(cantidadLavados + 1)
  }
  console.log(cantidadLavados)
  return (

    <div>
      {Array.from({ length: cantidadLavados }, (_, i) => (
        <ServicioRegister i={cantidadLavados} key={i} allService={allService} />
      ))}

      <Stack position='relative' top='-60px' alignItems='center'>
        <Button
          onClick={agregarLavado}
          loadingText='Registrando'
          size='lg'
          bg='primary.100'
          color='white'
          rounded='full'
          _hover={{
            bg: 'blue.500'
          }}
        >
          +
        </Button>
      </Stack>
    </div>
  )
}

// CHECK
const FormularioAceite = ({ allAceites }) => {
  const [cantidadAceites, setCantidadAceites] = useState(1)
  console.log(allAceites.current)

  const agregarAceite = () => {
    setCantidadAceites(cantidadAceites + 1)
  }

  return (
    <div>
      {Array.from({ length: cantidadAceites }, (_, i) => (
        <AceiteRegister i={cantidadAceites} key={i} allAceites={allAceites} />
      ))}
      <Stack position='relative' top='-60px' alignItems='center'>
        <Button
          onClick={agregarAceite}
          loadingText='Registrando'
          size='lg'
          bg='primary.100'
          color='white'
          rounded='full'
          _hover={{
            bg: 'blue.500'
          }}
        >
          +
        </Button>
      </Stack>
    </div>
  )
}

const FormularioFiltro = ({ allNewFilters }) => {
  const [cantidadFiltros, setCantidadFiltros] = useState(1)
  // MUESTRA REF ALLNEWFILTERS console.log(allNewFilters.current)

  const agregarFiltro = () => {
    setCantidadFiltros(cantidadFiltros + 1)
  }

  return (
    <div>
      {Array.from({ length: cantidadFiltros }, (_, i) => (
        <FiltroRegister i={cantidadFiltros} allNewFilters={allNewFilters} key={i} />
      ))}
      <Stack position='relative' top='-60px' alignItems='center'>
        <Button
          onClick={agregarFiltro}
          loadingText='Registrando'
          size='lg'
          bg='primary.100'
          color='white'
          rounded='full'
          _hover={{
            bg: 'blue.500'
          }}
        >
          +
        </Button>
      </Stack>
    </div>
  )
}

export default MyFormPedido
