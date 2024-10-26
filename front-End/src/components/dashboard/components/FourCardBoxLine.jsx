import { Grid, GridItem } from '@chakra-ui/react'
import CardBox from './CardBox'

const FourCardBoxLine = () => {
  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={10} m={5} w='97%'>
      <GridItem>
        <CardBox title='Cosa 1' text='Descripción de lo que se desee' buttonText='Click para visualizar' />
      </GridItem>
      <GridItem>
        <CardBox title='Cosa 2' text='Descripción de lo que se desee' buttonText='Click para visualizar' />
      </GridItem>
      <GridItem>
        <CardBox title='Cosa 3' text='Descripción de lo que se desee' buttonText='Click para visualizar' />
      </GridItem>
      <GridItem>
        <CardBox title='Cosa 4' text='Descripción de lo que se desee' buttonText='Click para visualizar' />
      </GridItem>
    </Grid>
  )
}

export default FourCardBoxLine
