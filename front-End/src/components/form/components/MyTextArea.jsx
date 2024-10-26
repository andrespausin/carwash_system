import { FormControl, FormLabel, Textarea, FormErrorMessage } from '@chakra-ui/react'

const MyTextArea = ({ label, onChange, placeholder, id, type = 'text', valueControl, onBlur, validationField = { isInvalid: false, message: '' } }) => {
  return (
    <FormControl isInvalid={validationField.isInvalid}>
      <FormLabel fontWeight='semibold'>{label}</FormLabel>
      <Textarea placeholder={placeholder} variant='filled' onChange={onChange} value={valueControl} id={id} type={type} onBlur={onBlur} />
      <FormErrorMessage>{validationField.message}</FormErrorMessage>
    </FormControl>
  )
}

export default MyTextArea
