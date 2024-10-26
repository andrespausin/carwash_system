import { Heading, Card, CardHeader, CardBody, CardFooter, Button, Text, Grid, GridItem } from '@chakra-ui/react'

const TwoCardBoxLine = () => {
  return (
    <Grid templateColumns='repeat(2, 1fr)' gap={10} m={5} w='97%'>
      <GridItem w='100%'>
        <Card>
          <CardHeader>
            <Heading size='md'>Aceite más vendido</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem>
        <Card w='100%'>
          <CardHeader>
            <Heading size='md'>Filtro más vendido</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
      </GridItem>
    </Grid>
  )
}

export default TwoCardBoxLine
