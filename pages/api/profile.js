import User from "../../models/User";
import connectDB from "../../utils/connectDB";

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


     const { name, lastName, session } = JSON.parse(req.body)
     if (!name || !lastName) {
          res.status(401).json({ status: 'failed', message: 'invalid data!' })
     }

     const user = await User.findOne({ email: session.user.email })

     user.name = name;
     user.lastName = lastName;
     user.save()
     res.status(200).json({ status: 'success', message: 'data updated' })
}