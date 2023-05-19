import connectDB from "../../utils/connectDB";
import User from "../../models/User";

export default async function handler(req, res) {
     try {
          await connectDB();
     } catch (err) {
          console.log(err);
          return res
               .status(500)
               .json({ status: "failed", message: "Error in connecting to DB" });
     }

     if (req.method === 'POST') {
          const { title, status, session } = JSON.parse(req.body);
          const user = await User.findOne({ email: session.user.email });
          if (!user) {
               return res.status(404).json({ status: 'failed', message: 'User doesnt exist!' })
          }
          if (!title || !status) {
               return res.status(422).json({ status: 'failed', message: 'Invalid data!' })
          }
          user.todos.push({ title, status })
          user.save()
          res.status(201).json({ status: 'success', message: 'Todo Created!' })
     } else if (req.method === 'PATCH') {
          const { id, status } = JSON.parse(req.body);
          
          const result = await User.updateOne(
               { 'todos._id': id },
               { $set: { 'todos.$.status': status } }
          );

          res.status(200).json({ status: 'success' })
     }

}