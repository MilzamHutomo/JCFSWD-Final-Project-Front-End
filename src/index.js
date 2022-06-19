import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

// Import main component
import Main from './main'

// Render main component
ReactDOM.render(
    <ChakraProvider>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </ChakraProvider>, document.getElementById('root')
)