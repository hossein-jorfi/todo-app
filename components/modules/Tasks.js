import { Box, Button, Flex } from "@chakra-ui/react";

const Tasks = ({ todos, fetchTodos, next, back, session }) => {

     const backHandler = async id => {
          const res = await fetch('api/todos', {
               method: 'PATCH',
               body: JSON.stringify({ id, status: back }),
               headers: { 'Content-Type': 'aplication/json' }
          })
          const data = await res.json()
          fetchTodos()
     }
     const nextHandler = async id => {
          const res = await fetch('api/todos', {
               method: 'PATCH',
               body: JSON.stringify({ id, status: next }),
               headers: { 'Content-Type': 'aplication/json' }
          })
          const data = await res.json()
          fetchTodos()
     }

     const deleteHandler = async id => {
          const res = await fetch(`api/delete-todo/${id}`, {
               method: 'POST',
               body: JSON.stringify({session}),
               headers: { 'Content-Type': 'aplication/jsno' }
          })
          const data = await res.json()
          fetchTodos();
     }

     return (
          todos?.map(item => {
               return (
                    <Box key={item._id} my='10px' p='10px' border='2px' borderRadius='10px' borderColor='gray.200'>
                         <Box color='gray.600'>{item.title}</Box>
                         <Flex justifyContent='space-between' alignItems='center' mt='10px'>
                              {
                                   item.status !== 'todo' &&
                                   <Button
                                        colorScheme="whatsapp"
                                        size='xs'
                                        onClick={() => backHandler(item._id)}
                                   >
                                        Back
                                   </Button>
                              }
                              <Button onClick={() => deleteHandler(item.title)} colorScheme="red" size='xs'>
                                   Delete
                              </Button>
                              {
                                   item.status !== 'done' &&
                                   <Button
                                        colorScheme="linkedin"
                                        size='xs'
                                        onClick={() => nextHandler(item._id)}
                                   >
                                        Next
                                   </Button>
                              }
                         </Flex>
                    </Box>
               )
          })
     );
};

export default Tasks;