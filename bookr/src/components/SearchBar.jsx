import React from 'react'
import {Input, Heading} from '@chakra-ui/react'

const SearchBar = ({handleChange, q, title}) => {

  return (
    <div className="searchBar">
      <Heading size="xl" mb={4}>{title}</Heading>
      <Input 
        color="gray.800" 
        placeholder='title or author' 
        _placeholder={{ color: 'inherit' }} 
        size='lg' 
        w="40%" 
        minW="25%" 
        m={2}
        value={q}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchBar