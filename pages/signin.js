import { getSession } from "next-auth/react";
import SigninPage from "../components/templates/SigninPage";
import connectDB from "../utils/connectDB";

const signin = () => {
     return <SigninPage />
};

export default signin;

export async function getServerSideProps({ req }) {
     await connectDB()
     const session = await getSession({ req })

     if (session) return {
          redirect: {
               destination: '/',
               permanent: false
          },
          props: {}
     }

     return {
          props: {}
     }
}