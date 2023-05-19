import { Box, Grid, GridItem, Tag } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Tasks from '../modules/Tasks';

const HomePage = ({ session }) => {

     const [todos, setTodos] = useState({});

     const fetchTodos = async () => {
          const res = await fetch('api/getTodos', {
               method: 'POST',
               body: JSON.stringify({ session }),
               headers: { 'Content-Type': 'aplicatin/json' }
          })
          const data = await res.json()
          if (data.status === 'success') {
               setTodos(data.data)
          }
     }

     useEffect(() => {
          fetchTodos();
     }, []);

     if (todos === {}) {
          return (
               <p>loading</p>
          )
     }

     if (todos !== {}) return (
          <Box>
               <Grid
                    templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={2}>
                    <Box padding='10px' border='2px' borderRadius='10px' borderColor='gray.200' bgColor='gray.50'>
                         <Tag w='100%' display='flex' justifyContent='center' colorScheme='orange' fontSize='1xl'>
                              Todo
                         </Tag>
                         {
                              todos.todo &&
                              <Tasks
                                   session={session}
                                   todos={todos.todo}
                                   fetchTodos={fetchTodos}
                                   next='progress'
                              />
                         }
                    </Box>
                    <Box padding='10px' border='2px' borderRadius='10px' borderColor='gray.200' bgColor='gray.50'>
                         <Tag w='100%' display='flex' justifyContent='center' colorScheme='green' fontSize='1xl'>
                              Progress
                         </Tag>
                         <Tasks
                              session={session}
                              todos={todos.progress}
                              fetchTodos={fetchTodos}
                              back='todo'
                              next='review'
                         />
                    </Box>
                    <Box padding='10px' border='2px' borderRadius='10px' borderColor='gray.200' bgColor='gray.50'>
                         <Tag w='100%' display='flex' justifyContent='center' colorScheme='blue' fontSize='1xl'>
                              Review
                         </Tag>
                         <Tasks
                              session={session}
                              todos={todos.review}
                              fetchTodos={fetchTodos}
                              back='progress'
                              next='done'
                         />
                    </Box>
                    <Box padding='10px' border='2px' borderRadius='10px' borderColor='gray.200' bgColor='gray.50'>
                         <Tag w='100%' display='flex' justifyContent='center' colorScheme='cyan' fontSize='1xl'>
                              Done
                         </Tag>
                         <Tasks
                              session={session}
                              todos={todos.done}
                              fetchTodos={fetchTodos}
                              back='review'
                         />
                    </Box>
               </Grid>
          </Box>
     );
};

export default HomePage;