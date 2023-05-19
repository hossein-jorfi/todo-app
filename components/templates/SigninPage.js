import {
     Flex,
     Box,
     FormControl,
     FormLabel,
     Input,
     InputGroup,
     HStack,
     InputRightElement,
     Stack,
     Button,
     Heading,
     Text,
     useColorModeValue,
     Link,
     useToast
} from '@chakra-ui/react';

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react'

export default function SigninPage() {
     const [showPassword, setShowPassword] = useState(false);
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')

     const router = useRouter()
     const toast = useToast()
     const signinHandler = async () => {
          const res = await signIn('credentials', {
               email, 
               password,
               redirect: false
          })
          if(res.ok) router.push('/')
          if (res.status === 401) {
               console.log('res');
               toast(({
                    title: res.error,
                    status: 'warning',
                    duration: 5000,
                    variant: 'top-accent',
                    isClosable: true,
                    position:'bottom-right'
               }))
          }
     }

     return (
          <Flex
               minH={'100vh'}
               align={'center'}
               justify={'center'}
               bg={useColorModeValue('gray.50', 'gray.800')}>
               <Stack spacing={8} mx={'auto'} maxW={'lg'} py={'0'} px={6}>
                    <Stack align={'center'}>
                         <Heading fontSize={'4xl'} textAlign={'center'}>
                              Sign in
                         </Heading>
                    </Stack>
                    <Box
                         rounded={'lg'}
                         bg={useColorModeValue('white', 'gray.700')}
                         boxShadow={'lg'}
                         p={8}>
                         <Stack spacing={4}>
                              {/* <HStack>
                                   <Box>
                                        <FormControl id="firstName" isRequired>
                                             <FormLabel>First Name</FormLabel>
                                             <Input type="text" />
                                        </FormControl>
                                   </Box>
                                   <Box>
                                        <FormControl id="lastName">
                                             <FormLabel>Last Name</FormLabel>
                                             <Input type="text" />
                                        </FormControl>
                                   </Box>
                              </HStack> */}
                              <FormControl id="email" isRequired>
                                   <FormLabel>Email address</FormLabel>
                                   <Input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                   />
                              </FormControl>
                              <FormControl id="password" isRequired>
                                   <FormLabel>Password</FormLabel>
                                   <InputGroup>
                                        <Input
                                             value={password}
                                             onChange={e => setPassword(e.target.value)}
                                             type={showPassword ? 'text' : 'password'}
                                        />
                                        <InputRightElement h={'full'}>
                                             <Button
                                                  variant={'ghost'}
                                                  onClick={() =>
                                                       setShowPassword((showPassword) => !showPassword)
                                                  }>
                                                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                             </Button>
                                        </InputRightElement>
                                   </InputGroup>
                              </FormControl>
                              <Stack spacing={10} pt={2}>
                                   <Button
                                        onClick={signinHandler}
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                             bg: 'blue.500',
                                        }}>
                                        Sign in
                                   </Button>
                              </Stack>
                              <Stack pt={6}>
                                   <Text align={'center'}>
                                        Dont Have Account? <Link href='/signup' color={'blue.400'}>Sign Up</Link>
                                   </Text>
                              </Stack>
                         </Stack>
                    </Box>
               </Stack>
          </Flex>
     );
}