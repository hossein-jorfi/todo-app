import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import Sidebar from '../components/templates/SideBar'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp;
