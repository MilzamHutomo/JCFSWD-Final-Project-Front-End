import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Text, useToast, VStack } from '@chakra-ui/react'

import { MdPowerSettingsNew, MdSend } from 'react-icons/md' 
import axios from 'axios'

export default function LoginPage () {
    const API_URL = process.env.REACT_APP_API_URL
    const toast = useToast()
    const navigate = useNavigate()
    
    const [ loading, setLoading ] = useState(false)
    const [ usernameLabel, setUsernameLabel ] = useState(false)
    const [ passwordLabel, setPasswordLabel ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false) 
    
    const username = useRef('')
    const password = useRef('')

    const onLoginButtonClick = () => {
        const login_data = {
            username : username.current.value,
            password : password.current.value
        }

        setLoading(true)

        axios.post(API_URL + '/users/login', login_data)
            .then((response) => {
                console.log(response)
                setLoading(false)
                localStorage.setItem('id', response.data[0].id)
                navigate('/profile')
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                return (
                    toast({
                        title: "Oops! There is a problem",
                        variant: 'solid',
                        duration: 3000,
                        status: 'error',
                        isClosable: true
                    })
                )
            })
    }

    const onUsernameInputChange = (event) => {
        if (event.target.value.length) setUsernameLabel(true)
        else setUsernameLabel(false)
    }

    const onPasswordInputChange = (event) => {
        if (event.target.value.length) setPasswordLabel(true)
        else setPasswordLabel(false)
    }

    const onShowPasswordButtonClick = () => {
        setShowPassword(!showPassword)
    }

    return (
        <Flex w='100vw' h='100vh' justifyContent='center' alignItems='center'>
        <VStack w='100%' spacing='20px'>
            <Heading>Identify Yourself!</Heading>
            <Box w='30%'
                bg='white'
                py='25px' 
                px='50px'
                borderRadius='15px'
                boxShadow='md'
            >
                { usernameLabel ? <Text>Username or Email</Text> : null }
                <Input ref={username} marginBottom='16px' type='text' variant='flushed' placeholder='Username or Email' focusBorderColor='purple.200' onChange={onUsernameInputChange}/> 
                { passwordLabel ? <Text>Password</Text> : null }
                <InputGroup>
                    <Input ref={password} marginBottom='16px' type={ showPassword ? 'text' : 'password' } variant='flushed' placeholder='Password' focusBorderColor='purple.200' onChange={onPasswordInputChange}/> 
                    <InputRightElement>
                        <Button size='sm' onClick={onShowPasswordButtonClick}>
                            <MdPowerSettingsNew />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Button leftIcon={<MdSend />} colorScheme='purple' onClick={onLoginButtonClick} isLoading={loading} loadingText='checking your membership'>
                Bring me in
            </Button>
        </VStack>
    </Flex>
    )
}