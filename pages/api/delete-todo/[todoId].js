import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";

export default async function handler(req, res) {
     try {
          await connectDB();
     } catch (err) {
          console.log(err);
          return res
               .status(500)
               .json({ status: "failed", message: "Error in connecting to DB" });
     }

     const { session } = JSON.parse(req.body)
     const user = await User.findOne({ email: session.user.email })

     const index = user.todos.findIndex(item => item.title === req.query.todoId);
     user.todos.splice(index, 1);
     user.save();
     res.status(200).json({status:'success', message: 'todo deleted'})
}