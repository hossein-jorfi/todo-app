import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import { getSession, signOut } from 'next-auth/react'
import React, { useState } from 'react';
import User from '../models/User';
import { useRouter } from 'next/router';
import {BiLogOutCircle} from 'react-icons/bi'

const Profile = ({ session, user }) => {

     const info = JSON.parse(user)
     const [name, setName] = useState(info.name || '')
     const [lastName, setLastName] = useState(info.lastName || '')
     const router = useRouter()

     const handler = async () => {
          const res = await fetch('api/profile', {
               method: 'POST',
               body: JSON.stringify({
                    name,
                    lastName,
                    session
               }),
               headers: { 'Conetnt-Type': 'aplication/json' }
          })
          const data = await res.json()
          router.reload()
     }

     const logOutHandler = () => {
          signOut();
          router.push('/signin')
     }

     return (
          <Box>
               <Heading color='gray.700'>{info.email}</Heading>
               <Box mt='2rem'>
                    <Heading size='md' color='gray.600'>{info.name || null} {info.lastName || null}</Heading>
                    <Heading size='md' color='gray.500'>{!info.name && 'please Enter your name and last name'}</Heading>
               </Box>
               <Box maxWidth='500px' mt='5'>
                    <Text>{!info.name ? 'Complete' : 'Update'} your information</Text>
                    <Input
                         onChange={e => setName(e.target.value)}
                         value={name}
                         placeholder='Name'
                         type='text'
                         variant='outline'
                         bgColor='white'
                         my='2'
                    />
                    <Input
                         onChange={e => setLastName(e.target.value)}
                         value={lastName}
                         placeholder='Last Name'
                         type='text'
                         variant='outline'
                         bgColor='white'
                         my='2'
                    />
                    <Button onClick={handler} my='2' colorScheme='blue' fontWeight='100'>Submit</Button>
               </Box>
               <Box height='5px' mt='10' borderRadius='20px' width='100%' bgColor='gray.300'></Box>
               <Button onClick={logOutHandler} colorScheme='red' mt='10' fontWeight='100'>
                    <BiLogOutCircle style={{
                         marginRight: '5px',
                         width: '20px',
                         height: '20px',
                    }} />
                    Sign Out
               </Button>
          </Box>
     );
};

export default Profile;

export async function getServerSideProps({ req }) {
     const session = await getSession({ req });
     if (session) {
          const user = await User.findOne({ email: session.user.email })
          return {
               props: {
                    session,
                    user: JSON.stringify(user)
               }
          }
     } else {
          return {
               redirect: {
                    destination: '/signin',
                    permenant: false
               }
          }
     }
}