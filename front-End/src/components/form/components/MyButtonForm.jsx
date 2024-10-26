import { Stack, Button } from '@chakra-ui/react'

const MyButtonForm = ({ editMode, onClick, label }) => {
  return (
    <Stack spacing={10} mt={8} pt={2} alignItems='center'>
      {!editMode
        ? (
          <Button
            minW='30%'
            w='fit-content'
            onClick={onClick}
            loadingText='Registrando'
            size='lg'
            bg='primary.100'
            color='white'
            _hover={{
              bg: 'blue.500'
            }}
          >
            {label}
          </Button>
          )
        : (
          <Button
            minW='30%'
            w='fit-content'
            onClick={onClick}
            loadingText='Registrando'
            size='lg'
            bg='blue.400'
            color='white'
            _hover={{
              bg: 'blue.500'
            }}
          >
            {label}
          </Button>
          )}

    </Stack>
  )
}

export default MyButtonForm
