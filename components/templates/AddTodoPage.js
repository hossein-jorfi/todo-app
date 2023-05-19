import {
     RadioGroup,
     Radio,
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
} from '@chakra-ui/react';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddTodoPage({ session }) {

     const [title, setTitle] = useState('')
     const [status, setStatus] = useState('todo')

     const router = useRouter()

     const clickHandler = async () => {
          const req = await fetch('api/todos', {
               method: 'POST',
               body: JSON.stringify({ title, status, session }),
               headers: { 'Content-Type': 'aplication/json' }
          })
          const res = await req.json()
          console.log(res);
          if (res.status === 'success') router.push('/')
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
                              Add Todo
                         </Heading>
                    </Stack>
                    <Box
                         rounded={'lg'}
                         bg={useColorModeValue('white', 'gray.700')}
                         boxShadow={'lg'}
                         p={8}>
                         <Stack spacing={4}>
                              <FormControl id="email" w={[280, 400]} isRequired>
                                   <FormLabel>Todo title</FormLabel>
                                   <Input
                                        type="email"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                   />
                              </FormControl>
                              <HStack>
                                   <RadioGroup>
                                        <Stack direction='row'>
                                             <Radio
                                                  checked={status === 'todo'}
                                                  onChange={e => setStatus(e.target.value)}
                                                  value='todo'
                                                  size={['sm', 'lg']}
                                                  
                                             >
                                                  Todo
                                             </Radio>
                                             <Radio
                                                  checked={status === 'progress'}
                                                  onChange={e => setStatus(e.target.value)}
                                                  value='progress'
                                                  size={['sm', 'lg']}
                                             >
                                                  Progress
                                             </Radio>
                                             <Radio
                                                  checked={status === 'review'}
                                                  onChange={e => setStatus(e.target.value)}
                                                  value='review'
                                                  size={['sm', 'lg']}
                                             >
                                                  Review
                                             </Radio>
                                             <Radio
                                                  checked={status === 'done'}
                                                  onChange={e => setStatus(e.target.value)}
                                                  value='done'
                                                  size={['sm', 'lg']}
                                             >
                                                  Done
                                             </Radio>
                                        </Stack>
                                   </RadioGroup>
                              </HStack>
                              <Stack spacing={10} pt={2}>
                                   <Button
                                        onClick={clickHandler}
                                        loadingText="Submitting"
                                        size="lg"
                                        colorScheme='whatsapp'
                                   >
                                        Add Todo
                                   </Button>
                              </Stack>
                         </Stack>
                    </Box>
               </Stack>
          </Flex>
     );
}