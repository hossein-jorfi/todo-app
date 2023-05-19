import connectDB from "../utils/connectDB";
import { getSession } from "next-auth/react";
import AddTodoPage from "../components/templates/AddTodoPage";

const addtodo = ({ session }) => {
     return <AddTodoPage session={session} />
};

export default addtodo;

export async function getServerSideProps({ req }) {
     await connectDB();
     const session = await getSession({ req })

     if (!session) {
          return {
               redirect: { destination: '/signin', permenant: false },
               props: {}
          }
     }

     return {
          props: { session }
     }
}