import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, ButtonGroup, Code, Flex, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios'

export default function ProfilePage () {
    const API_URL = process.env.REACT_APP_API_URL
    const user_id = localStorage.getItem('id')
    const navigate = useNavigate()
    const toast = useToast()

    const [ isEditing, setIsEditing ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ usernameAvailable, setUsernameAvailable ] = useState(true) 

    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')
    const [ quote, setQuote ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ oldUsername, setOldUsername ] = useState('')

    useEffect(() => {
        axios.get(API_URL + `/users/${user_id}`)
            .then((response) => {
                console.log(response.data[0])
                setName(response.data[0].name)
                setUsername(response.data[0].username)
                setEmail(response.data[0].email)
                setOldUsername(response.data[0].username)

                if (response.data[0].quote.length) setQuote(response.data[0].quote)
            })
            .catch((error) => {
                console.log(error)
            })
            // eslint-disable-next-line
    }, [])

    const onEditButtonClick = () => {
        setIsEditing(!isEditing)
    }

    const onLogoutButtonClick = () => {
        localStorage.removeItem('id')
        navigate('/login')
    }

    const onNameInputChange = (event) => {
        setName(event.target.value)
    }

    const onUsernameInputChange = (event) => {
        setUsername(event.target.value)
    }

    const onQuoteInputChange = (event) => {
        setQuote(event.target.value)
    }

    const onSaveButtonClick = () => {
        const updated_user_data = {
            name : name,
            username : username,
            quote : quote
        }

        setLoading(true)
        
        axios.post(API_URL + `/users/update/${user_id}`, updated_user_data)
        .then((response) => {
                console.log(response)
                setIsEditing(false)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsEditing(false)
                setLoading(false)
            })
    }

    const onUsernameInputBlur = () => {
        if (username !== oldUsername) {
            axios.post(API_URL + '/users/username_check', {username: username})
                .then((response) => {
                    console.log(response)
                    if (response.data.length) {
                        setUsernameAvailable(false)
                        return (
                            toast({
                                title: 'Another alien has used that username!',
                                variant: 'solid',
                                status: 'error',
                                duration: 3000,
                                isClosable: true,
                            })
                        )
                    } else setUsernameAvailable(true)
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            setUsernameAvailable(true)
        }
    }

    return (
        <Flex w='100vw' h='100vh' justifyContent='center' alignItems='top' padding='50px'>
            <Flex flexDirection='column' gap='3' w='50%' alignItems='center'>
                <Avatar size='2xl' name='Purwadhika'/>{' '}
                { isEditing ? 
                    <Textarea placeholder='Write down something to identify yourself among the Aliens' resize='none' backgroundColor='white' value={quote} onChange={onQuoteInputChange}/>
                    :
                    <Code colorScheme='whatsapp' children={ quote } />
                }
                { isEditing ? 
                    <ButtonGroup>
                        <Button colorScheme='red' isDisabled={loading || !usernameAvailable} onClick={onEditButtonClick}>Cancel</Button>
                        <Button colorScheme='whatsapp' isDisabled={!usernameAvailable} isLoading={loading} loadingText='Sending your package' onClick={onSaveButtonClick}>Save</Button>
                    </ButtonGroup>
                    :
                    <Button colorScheme='purple' w='25%' onClick={onEditButtonClick}>Edit Profile</Button>
                }
                <Box w='100%'
                    bg='white'
                    py='25px' 
                    px='50px'
                    borderRadius='15px'
                    boxShadow='md'
                >
                    { isEditing ? 
                        <div>
                            <Text fontWeight='bold'>Fullname</Text>
                            <Input marginBottom='24px' type='text' variant='flushed' placeholder='What is your name?' focusBorderColor='purple.200' value={ name } onChange={onNameInputChange}/>
                            <Text fontWeight='bold'>Username</Text>
                            <Input marginBottom='24px' type='text' variant='flushed' placeholder='Whisper your alias, will you?' focusBorderColor='purple.200' value={ username } isInvalid={!usernameAvailable} errorBorderColor='red.500' onChange={onUsernameInputChange} onBlur={onUsernameInputBlur}/>
                        </div>
                        : 
                        <div>
                            <Text fontWeight='bold'>Fullname</Text>
                            <Text marginBottom='24px'>{ name }</Text>
                            <Text fontWeight='bold'>Username</Text>
                            <Text marginBottom='24px'>{ username }</Text>
                        </div>
                    }
                    <Text fontWeight='bold'>Email</Text>
                    <Text marginBottom='24px'>{ email }</Text>
                </Box>
                <Button colorScheme='red' w='25%' isDisabled={loading} onClick={onLogoutButtonClick}>Logout</Button>
            </Flex>
        </Flex>
    )
}