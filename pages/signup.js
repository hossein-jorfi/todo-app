import SignupPage from "../components/templates/SignupPage";
import { getSession } from "next-auth/react";
import connectDB from "../utils/connectDB";

const signup = () => {
     return <SignupPage />
};

export default signup;

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