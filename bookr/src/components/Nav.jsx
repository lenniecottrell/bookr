import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Text
} from '@chakra-ui/react'

const Nav = () => {
  return (
    <div className='nav'>
      <Text fontSize={48}>Bookr</Text>
      <Breadcrumb className='navLinks'>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Search</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>My Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>About</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Account</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  )
}

export default Nav