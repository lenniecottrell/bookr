import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import About from './pages/About'
import MyLibrary from './pages/MyLibrary'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='about' element={<About />} />
          <Route path='library' element={<MyLibrary />} />
          {/* <Route path="account" element={<Account />} /> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
)
