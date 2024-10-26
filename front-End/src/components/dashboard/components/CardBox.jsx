import { Card, CardHeader, CardBody, Heading, Text, Button, CardFooter, chakra } from '@chakra-ui/react'

const CardBox = ({ bg, mt, w, title, buttonText, children }) => {
  return (
    <Card w={w} bg={bg} mt={mt} textAlign='center'>
      <CardHeader>
        <Heading size='md'>{title}</Heading>
      </CardHeader>
      <CardBody>
        {children}
      </CardBody>
      {/* <CardFooter>
        <Button>{buttonText}</Button>
      </CardFooter> */}
    </Card>
  )
}
export default CardBox
