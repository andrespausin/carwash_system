import { Flex, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import './view.css'
import CardBox from '../dashboard/components/CardBox'
import { Doughnut } from '../dashboard/graphics/Doughnut'
import SplineSales from '../dashboard/graphics/SplineSales'
import MyTableDashboard from '../tables/MyTableDashboard'
import { useInventoryStatus } from '../../hooks/graphics/useInventoryStatus'

const COLUMNS = [
  { key: 'idCategoria', name: 'Categoria' },
  { key: 'idProducto', name: 'Producto' },
  { key: 'marca', name: 'Marca' },
  { key: 'tipo', name: 'Tipo' },
  { key: 'stock_min', name: 'Stock mmínimo' },
  { key: 'stock_actual', name: 'Stock actual' }
]

const MainView = () => {
  const { outOfStock, lessThanMin } = useInventoryStatus()
  console.log(outOfStock.length, lessThanMin.length)
  return (
    <>
      <Flex gap={8}>
        <CardBox bg='background.bg' w='65%' title='Ventas totales de aceites'>
          <SplineSales />
        </CardBox>
        <CardBox bg='background.bg' w='35%' title='Porcentaje de ventas'>
          <Doughnut />
        </CardBox>
      </Flex>
      {outOfStock.length !== 0 && lessThanMin.length !== 0
        ? (
          <Grid templateColumns='repeat(2, 1fr)' gap={10} m={5} w='98%'>
            <GridItem>
              <Heading m={5} size='xl' fontWeight='extrabold' textAlign='center'>
                INVENTARIO OUT OF STOCK
              </Heading>
              <MyTableDashboard modalMode data={outOfStock} columns={COLUMNS} title='Productos sin stock' idRow='idProducto' />
            </GridItem>
            <GridItem>
              <Heading m={5} size='xl' fontWeight='extrabold' textAlign='center'>
                INVENTARIO POR AGOTARSE
              </Heading>
              <MyTableDashboard modalMode data={lessThanMin} columns={COLUMNS} title='Productos con stock menor al mínimo' idRow='idProducto' />
            </GridItem>
          </Grid>
          )
        : (
            outOfStock.length !== 0 && lessThanMin.length === 0
              ? (
                <Stack w='100%' alignItems='center'>
                  <Heading m={5} size='xl' fontWeight='extrabold' textAlign='center'>
                    INVENTARIO OUT OF STOCK
                  </Heading>
                  <MyTableDashboard data={outOfStock} columns={COLUMNS} title='Productos sin stock' idRow='idProducto' />
                </Stack>
                )
              : (lessThanMin.length !== 0 && outOfStock.length === 0
                  ? (
                    <Stack w='100%' alignItems='center'>
                      <Heading m={5} size='xl' fontWeight='extrabold' textAlign='center'>
                        INVENTARIO POR AGOTARSE
                      </Heading>
                      <MyTableDashboard data={lessThanMin} columns={COLUMNS} title='Productos con stock menor al mínimo' idRow='idProducto' />
                    </Stack>)
                  : null
                )
          )}

    </>

  )
}

export default MainView
