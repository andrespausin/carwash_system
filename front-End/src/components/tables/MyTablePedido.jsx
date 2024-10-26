// You should also import some data for the table
import {
  Button,
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Stack,
  HStack,
  Heading,
  useToast
} from '@chakra-ui/react'
import { alertToastAbono, alertToastDeletePedido } from '../../hooks/toast/alertToast.js'
import { FiDollarSign, FiDownload, FiEye, FiEdit, FiDelete } from 'react-icons/fi'
import { COLUMNS_VENTAS, COLUMNS_SERVICIOS, COLUMNS_NOTES, PAID_OPTIONS } from '../../constants.js'
import FormModal from '../form/modals/FormModal'
import { createNewDetails, deletePedidoById } from '../../service/pedidos.js'
import { useEffect, useState } from 'react'
import MyTable from './MyTable.jsx'
import MyInput from '../form/components/MyInput.jsx'
import MyButton from '../form/components/MyButtonForm.jsx'
import { useDetails } from '../../hooks/pedido/useDetails.js'
import generatePDF from '../../docs/template.js'
import MySelect from '../form/components/MySelect.jsx'

const ShowDetails = ({ details }) => {
  console.log(details)
  return (
    <>
      <Heading bg='background.bg' m={5} size='lg' textAlign='center' fontWeight='extrabold'>
        PEDIDO NRO. {details ? details.pedido.idPedido : 'null'}
      </Heading>
      {details &&
        <Stack>

          {details.ventas.length > 0 &&
            <>
              <Heading textAlign='center' size='md' fontWeight='bold'>
                Ventas realizadas
              </Heading>
              <MyTable title='' data={details ? details.ventas : []} columns={COLUMNS_VENTAS} action={false} modalMode />
            </>}
          {details.washService.length > 0 &&
            <>
              <Heading size='md' textAlign='center' fontWeight='bold'>
                Servicios de lavado
              </Heading>
              <MyTable title='' data={details ? details.washService : []} columns={COLUMNS_SERVICIOS} action={false} modalMode />
            </>}
          {details.notes.length > 0 &&
            <>
              <Heading size='md' textAlign='center' fontWeight='bold'>
                Notas del pedido
              </Heading>
              <MyTable title='' data={details ? details.notes : []} columns={COLUMNS_NOTES} action={false} modalMode />
            </>}
        </Stack>}

    </>
  )
}

const MyTablePedido = ({ data }) => {
  const { details, setIdDetails, idDetails, setType, type } = useDetails()
  const [maxAbono, setMaxAbono] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenAbono, setIsOpenAbono] = useState(false)
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [pagados, setPagados] = useState('Todos')
  const [initialDate, setInitialDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  console.log(data)

  const refreshPage = () => {
    window.location.reload()
  }

  const handleClose = () => {
    setIsOpen(false)
    setIdDetails(null)
  }

  const handleChangePagados = (e) => {
    setPagados(e.target.value)
  }

  const handleCloseAbono = () => {
    setIsOpenAbono(false)
  }

  const handleDelete = (idPedido) => {
    alertToastDeletePedido({ condition: true, toast, onSuccessMethod: deletePedidoById, object: idPedido, refreshPage })
  }

  const searcher = (e) => {
    setSearch(e.target.value)
  }

  const dater = (e) => {
    e.target.id === 'fechaInicial' ? setInitialDate(e.target.value) : setFinalDate(e.target.value)
  }

  const dateConverter = (date) => {
    const [day, month, year] = date.split('/')
    const newDate = `${year}-${month}-${day}`
    return newDate
  }

  const dataFilter = (data) => {
    if (pagados === 'Pagado') {
      if (!initialDate && !finalDate && !search) {
        const newData = data.filter((row) => row.abono === row.monto)
        return newData
      }
      if (!initialDate && !finalDate) {
        const newData = data.filter((row) => row.nombre.toLowerCase().includes(search.toLowerCase()) && row.abono === row.monto)
        return newData
      }
      if (!finalDate && initialDate.length === 10) {
        const newData = data.filter((row) => row.nombre.toLowerCase().includes(search.toLowerCase()) && dateConverter(row.fecha) >= initialDate && row.abono === row.monto)
        return newData
      }
      if (!initialDate && finalDate.length === 10) {
        const newData = data.filter((row) => row.nombre.toLowerCase().includes(search.toLowerCase()) && dateConverter(row.fecha) <= finalDate && row.abono === row.monto)
        return newData
      }
      const newData = data.filter((row) => dateConverter(row.fecha) >= initialDate && dateConverter(row.fecha) <= finalDate && row.nombre.toLowerCase().includes(search.toLowerCase()) && row.abono === row.monto)
      return newData
    } else if (pagados === 'No pagado') {
      if (!initialDate && !finalDate && !search) {
        const newData = data.filter((row) => row.abono !== row.monto)
        return newData
      }
      if (!initialDate && !finalDate) {
        const newData = data.filter((row) => row.nombre.toLowerCase().includes(search.toLowerCase()) && row.abono !== row.monto)
        return newData
      }
      if (!finalDate && initialDate.length === 10) {
        const newData = data.filter((row) => row.nombre.toLowerCase().includes(search.toLowerCase()) && dateConverter(row.fecha) >= initialDate && row.abono !== row.monto)
        return newData
      }
      if (!initialDate && finalDate.length === 10) {
        const newData = data.filter((row) => row.nombre.toLowerCase().includes(search.toLowerCase()) && dateConverter(row.fecha) <= finalDate && row.abono !== row.monto)
        return newData
      }
      const newData = data.filter((row) => dateConverter(row.fecha) >= initialDate && dateConverter(row.fecha) <= finalDate && row.nombre.toLowerCase().includes(search.toLowerCase()) && row.abono !== row.monto)
      return newData
    } else {
      if (!initialDate && !finalDate) {
        const newData = data.filter((row) => row.nombre.toLowerCase().includes(search.toLowerCase()))
        return newData
      }
      if (!finalDate && initialDate.length === 10) {
        const newData = data.filter((row) => row.nombre.toLowerCase().includes(search.toLowerCase()) && dateConverter(row.fecha) >= initialDate)
        return newData
      }
      if (!initialDate && finalDate.length === 10) {
        const newData = data.filter((row) => row.nombre.toLowerCase().includes(search.toLowerCase()) && dateConverter(row.fecha) <= finalDate)
        return newData
      }
      const newData = data.filter((row) => dateConverter(row.fecha) >= initialDate && dateConverter(row.fecha) <= finalDate && row.nombre.toLowerCase().includes(search.toLowerCase()))
      return newData
    }
  }

  const results = !search && !initialDate && !finalDate && pagados === 'Todos' ? data : (dataFilter(data))
  console.log(results)
  const ventasTotales = results ? results.reduce((acc, row) => acc + parseFloat(row.monto), 0) : 0
  console.log(ventasTotales)

  useEffect(() => {
    if (idDetails === null) return
    if (type === 'pdf') {
      console.log(idDetails)
      const encabezadoPedido = data.find(pedido => pedido.idPedido === idDetails)
      console.log(encabezadoPedido)
      const pdfData = {
        encabezadoPedido,
        ventas: details.ventas,
        washService: details.washService,
        abonos: details.abonos
      }
      console.log(pdfData)
      generatePDF(pdfData)
      setType(null)
    }
  }, [details])
  return (
    <>
      <HStack gap='15px' width='80%' alignItems='center' mb='20px'>
        <MyInput label='Búsqueda por nombre del cliente' placeholder='Promotora Azimut' valueControl={search} onChange={searcher} />
        <MyInput label='Fecha inicial' id='fechaInicial' type='date' valueControl={initialDate} onChange={dater} />
        <MyInput label='Fecha final' id='fechaFinal' type='date' valueControl={finalDate} onChange={dater} />
        <MySelect label='Opciones' valueControl={pagados} options={PAID_OPTIONS} onChange={handleChangePagados} />
      </HStack>
      <Stack gap='15px' width='100%' alignItems='right' mb='20px'>
        <Heading pl='70%' size='md' fontWeight='bold'>
          VENTAS TOTALES: {ventasTotales}
        </Heading>
      </Stack>
      <Card w='90%' bg='background.bg'>
        <CardBody>
          <TableContainer>
            <Table variant='none' size='sm'>
              <TableCaption>Lista de pedidos</TableCaption>
              <Thead>
                <Tr>
                  <Th fontSize='xs' />
                  <Th>Información del pedido</Th>
                  <Th>Monto</Th>
                  <Th>Abono</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data
                  ? results.map((pedido, i) => (
                    <Tr key={pedido.idPedido}>
                      <Td>
                        <Button
                          bg={pedido.abono === pedido.monto ? 'green.500' : 'red.500'}
                          size='xs'
                          _hover={pedido.abono === pedido.monto ? { bg: 'green.600' } : { bg: 'red.600' }}
                        />
                      </Td>
                      <Td w='70%'>
                        <Stack direction='column'>
                          <Text as='b' fontSize='lg'>{pedido.fecha}</Text>
                          <Text color='gray' as='i'>{pedido.idCliente} - {pedido.nombre} {pedido.apellido}</Text>
                          <Text color='gray'># {pedido.idPedido}</Text>
                        </Stack>
                      </Td>
                      <Td>
                        {pedido.monto}
                      </Td>
                      <Td>
                        {pedido.abono}
                      </Td>
                      <Td>
                        <Stack direction='row'>
                          <Button
                            title='Visualizar pedido'
                            bg='primary.100'
                            _hover={{
                              bg: 'primary.70'
                            }}
                            size='sm'
                            mr='2'
                            onClick={() => {
                              setIdDetails(pedido.idPedido)
                              setIsOpen(true)
                            }}
                          >
                            <FiEye />
                          </Button>
                          <Button
                            title='Descargar PDF'
                            name='descargar PDF'
                            bg='alerts.success'
                            _hover={{
                              bg: 'green.500'
                            }}
                            size='sm'
                            mr='2'
                            onClick={(e) => {
                              setIdDetails(pedido.idPedido)
                              setType('pdf')
                            }}
                          >
                            <FiDownload />
                          </Button>
                          <Button
                            title='Hacer abono'
                            name='Add Abono'
                            bg='alerts.jeans'
                            _hover={{
                              bg: '#5576EF'
                            }}
                            size='sm'
                            mr='2'
                            onClick={(e) => {
                              setIsOpenAbono(true)
                              setMaxAbono({ idPedido: pedido.idPedido, monto: pedido.monto, abono: pedido.abono })
                            }}
                          >
                            <FiEdit />
                          </Button>
                          <Button
                            title='Delete pedido'
                            name='Delete pedido'
                            bg='#EF4444'
                            _hover={{
                              bg: '#EF4400'
                            }}
                            size='sm'
                            mr={2}
                            onClick={(e) => {
                              handleDelete(pedido.idPedido)
                            }}
                          >
                            <FiDelete />
                          </Button>
                        </Stack>
                      </Td>
                    </Tr>
                  ))
                  : null}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
        <FormModal
          isOpen={isOpen} onClose={handleClose}
        >
          <ShowDetails details={details} />
        </FormModal>
        <FormModal isOpen={isOpenAbono} onClose={handleCloseAbono}>
          <MyFormAbono data={maxAbono} />
        </FormModal>
      </Card>
    </>
  )
}

const MyFormAbono = ({ data }) => {
  const [abono, setAbono] = useState('')
  const [note, setNote] = useState('')
  const [validationField, setValidationField] = useState({ isInvalid: false, message: '' })
  const toast = useToast()
  const maxValue = data.monto - data.abono
  const handleNote = (e) => {
    console.log(e.target.value)
    setNote(e.target.value)
  }
  const handleAbono = (e) => {
    console.log(e.target.value)
    if (e.target.value > maxValue) {
      setValidationField({ isInvalid: true, message: `El abono no puede ser mayor a ${maxValue}` })
      setAbono(maxValue)
      return
    }

    if (e.target.value.includes('.') && e.target.value.split('.')[1].length > 2) {
      setAbono(parseFloat(e.target.value).toFixed(2))
      return
    }

    setAbono(e.target.value)
    setValidationField({ isInvalid: false, message: '' })
  }
  const handleSubmit = (e) => {
    console.log(abono)
    const dia = new Date().getDate()
    const mes = new Date().getMonth() + 1
    const anio = new Date().getFullYear()
    const newAbono = {
      idPedido: data.idPedido,
      abono,
      fecha: anio + '-' + mes + '-' + dia
    }

    const newNote = {
      idPedido: data.idPedido,
      note
    }

    const newData = {
      newAbono,
      newNote
    }
    const refreshPage = () => {
      window.location.reload()
    }
    e.preventDefault()
    console.log(newData)
    if (abono || note) {
      alertToastAbono({ condition: true, toast, onSuccessMethod: createNewDetails, object: newData, refreshPage })
    }
  }
  return (
    <>
      <Heading bg='background.bg' m={5} size='lg' textAlign='center' fontWeight='extrabold'>
        PEDIDO NRO. {data.idPedido}
      </Heading>
      <MyInput mb={6} validationField={validationField} onChange={handleAbono} valueControl={abono} id='abono' label='Nuevo abono' placeholder='100' type='number' icon={<FiDollarSign />} />

      <MyInput onChange={handleNote} valueControl={note} id='note' label='Nota del pedido' placeholder='Descripción del pedido' icon={<FiEdit />} />
      <MyButton onClick={handleSubmit} label='Guardar' />
    </>
  )
}
export default MyTablePedido
