import User from "../../models/User";
import connectDB from "../../utils/connectDB";
import { sortTodos } from "../../utils/sortTodos";

export default async function handler(req, res) {
     if (req.method !== "POST") return;
     try {
          await connectDB();
     } catch (err) {
          console.log(err);
          return res
               .status(500)
               .json({ status: "failed", message: "Error in connecting to DB" });
     }

     const { session } = JSON.parse(req.body);
     const user = await User.findOne({ email: session.user.email })
     const sortedTodos = sortTodos(user.todos)
     
     res.status(200).json({status:'success', data: sortedTodos} )
}