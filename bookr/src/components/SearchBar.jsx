import React, {useState, useEffect} from 'react'
import {Input, Heading} from '@chakra-ui/react'

const SearchBar = ({handleChange, q}) => {

  
  return (
    <div className="searchBar">
      <Heading size="xl">Find a book</Heading>
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