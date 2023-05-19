import User from "../../../models/User";
import { hashPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connectDB";

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

     const { email, password } = JSON.parse(req.body);

     if (!email || !password) {
          return res.status(401).json({
               status: "failed",
               message: "Invalid data!",
               code: 401,
          });
     }

     const user = await User.findOne({ email, email })
     if (user) {
          return res.status(401).json({
               status: "failed",
               code: 401,
               message: "User Alredy exist!",
          });
     }

     const hashedPassword = await hashPassword(password);

     const newUser = await User.create({ email: email, password: hashedPassword });
     console.log(newUser);

     res.status(201).json({ status: "success", message: "User Created" });
}