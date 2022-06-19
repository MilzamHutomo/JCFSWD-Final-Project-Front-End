import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

// Pages
import LoginPage from './pages/login-page'
import RegisterPage from './pages/register-page'
import ProfilePage from './pages/profile-page'

export default function Main () {
    return (
        <Box w='100vw' h='100vh' backgroundColor='#f9f9f9'>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/profile' element={<ProfilePage />} />
            </Routes>
        </Box>
    )
}