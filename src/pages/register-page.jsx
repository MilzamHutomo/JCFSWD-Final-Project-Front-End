import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, Heading, Input, Text, useToast, VStack } from '@chakra-ui/react'
import { MdSend } from 'react-icons/md'
import axios from 'axios'

export default function RegisterPage () {
    const API_URL = process.env.REACT_APP_API_URL
    const [ loading, setLoading ] = useState(false)
    const [ usernameLabel, setUsernameLabel ] = useState(false)
    const [ emailLabel, setEmailLabel ] = useState(false)
    const [ passwordLabel, setPasswordLabel ] = useState(false)
    const [ repeatPasswordLabel, setRepeatPasswordLabel ] = useState(false)

    const username = useRef('')
    const email = useRef('')
    const password = useRef('')
    const repeat_password = useRef('')

    const navigate = useNavigate()
    const toast = useToast()

    // Function
    const onRegisterButtonClick = () => {
        const new_user_data = {
            username        : username.current.value,
            email           : email.current.value,
            password        : password.current.value,
            repeat_password : repeat_password.current.value
        }

        /**
         * Requirement:
         * * Register
         * Feature Acceptance:
         * * 6. Throttle registration requests by disabling the register button until a response is received.
         */
        setLoading(true)

        console.log(new_user_data)

        axios.post(API_URL + '/users', new_user_data)
            .then((response) => {
                console.log(response)
                setLoading(false)

                username.current.value = ''
                email.current.value = ''
                password.current.value = ''
                repeat_password.current.value = ''

                navigate('/login')
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                return (
                    toast({
                        title: error.response.data,
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

    const onEmailInputChange = (event) => {
        if (event.target.value.length) setEmailLabel(true)
        else setEmailLabel(false)
    }

    const onPasswordInputChange = (event) => {
        if (event.target.value.length) setPasswordLabel(true)
        else setPasswordLabel(false)
    }

    const onRepeatPasswordInputChange = (event) => {
        if (event.target.value.length) setRepeatPasswordLabel(true)
        else setRepeatPasswordLabel(false)
    }

    return (
        <Flex w='100vw' h='100vh' justifyContent='center' alignItems='center'>
            <VStack w='100%' spacing='20px'>
                <Heading>Fill the form</Heading>
                <Box w='30%'
                    bg='white'
                    py='25px' 
                    px='50px'
                    borderRadius='15px'
                    boxShadow='md'
                >
                    { usernameLabel ? <Text>Username</Text> : null }
                    <Input ref={username} marginBottom='16px' type='text' variant='flushed' placeholder='Username' focusBorderColor='purple.200' onChange={onUsernameInputChange}/>  
                    { emailLabel ? <Text>Email</Text>  : null }
                    <Input ref={email} marginBottom='16px' type='email' variant='flushed' placeholder='Email' focusBorderColor='purple.200' onChange={onEmailInputChange}/>  
                    { passwordLabel ? <Text>Password</Text> : null }
                    <Input ref={password} marginBottom='16px' type='password' variant='flushed' placeholder='Password' focusBorderColor='purple.200' onChange={onPasswordInputChange}/>  
                    { repeatPasswordLabel ? <Text>Repeat Password</Text> : null }
                    <Input ref={repeat_password} marginBottom='16px' type='password' variant='flushed' placeholder='Repeat Password' focusBorderColor='purple.200' onChange={onRepeatPasswordInputChange}/>  
                </Box>
                <Button leftIcon={<MdSend />} colorScheme='purple' onClick={onRegisterButtonClick} isLoading={loading} loadingText='looking for a seat'>
                    Join the club
                </Button>
            </VStack>
        </Flex>
    )
}