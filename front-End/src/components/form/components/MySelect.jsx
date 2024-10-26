import { FormControl, FormLabel, Select } from '@chakra-ui/react'
const MySelect = ({ label, onChange, placeholder, id, valueControl, options }) => {
  return (
    <FormControl>
      <FormLabel fontWeight='semibold'>{label}</FormLabel>
      <Select variant='filled' placeholder={placeholder} onChange={onChange} value={valueControl} id={id}>
        {options.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default MySelect
