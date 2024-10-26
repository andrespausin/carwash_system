import { Box, HStack } from '@chakra-ui/react'

const MyBoxFormField = ({ type = 'single', proportion, children }) => {
  return (
    <HStack w='100%'>
      {type === 'double'
        ? (
          <>
            <Box w={proportion[0]}>{children[0]}</Box>
            <Box w={proportion[1]}>{children[1]}</Box>
          </>
          )
        : (
          <>
            <Box w={proportion[0]}>{children[0]}</Box>
            <Box w={proportion[1]}>{children[1]}</Box>
            <Box w={proportion[2]}>{children[2]}</Box>
          </>
          )}
    </HStack>
  )
}

export default MyBoxFormField
