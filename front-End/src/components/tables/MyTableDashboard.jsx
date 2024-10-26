import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,
  CardBody,
  TableCaption,
  TableContainer
} from '@chakra-ui/react'

import './css/table.css'
import FormModal from '../form/modals/FormModal'

const MyTableDashboard = ({ data, columns, title, idRow, inventoryMode = false, children }) => {
  return (
    <Card w='100%' bg='background.bg' shadow='lg'>
      <CardBody>
        <TableContainer>
          <Table variant='none' bg='background.panel' size='sm'>
            <TableCaption>{title}</TableCaption>
            <Thead>
              <Tr>
                {columns.map((column) => (
                  <Th textAlign='center' key={column.key}>{column.name}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, i) => (
                <Tr
                  className='table-row'
                  key={i + row[idRow]}
                >
                  {columns.map((column) => (
                    <Td textAlign='center' className='table-cell' key={column.key}>{inventoryMode ? (row[column.key] === 'F' ? 'FILTRO' : row[column.key] === 'A' ? 'ACEITE' : row[column.key]) : row[column.key]}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
      <FormModal w='100%'>
        {children}
      </FormModal>
    </Card>
  )
}

export default MyTableDashboard
