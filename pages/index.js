import HomePage from '../components/templates/HomePage';
import { getSession } from 'next-auth/react';
import connectDB from '../utils/connectDB';

const index = ({ session }) => {
     return (
          <HomePage session={session} />
     )
};

export default index;

export async function getServerSideProps({ req }) {
     await connectDB()
     const session = await getSession({ req })
     if (!session) {
          return {
               redirect: {
                    destination: '/signin',
                    permenant: false
               },
               props: {}
          }
     }
     return { props: { session } }
}