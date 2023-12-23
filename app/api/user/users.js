import { connectToDB } from "@utility/database";
import User from "@models/user";

export default async function handler(req,res){
    const {method, body} = req;

    if(method !== "POST" ){
        return res.status(405).json({message: "Method not supported"});
    }

    const {userData} = body;
    try{
        await connectToDB();
        
         // Check if the user already exists based on the email
         const existingUser = await User.findOne({ email: userData.emailAddresses });

         if (existingUser) {
             // Update existing user's information
             existingUser.username = userData.username;
             existingUser.imageUrl = userData.imageUrl;
 
             await existingUser.save();
             res.status(200).json({ message: "User updated successfully" });
         } else {
             // Create a new user if not found
             await User.create({
                 email: userData.emailAddresses,
                 username: userData.username,
                 imageUrl: userData.imageUrl
             });
             res.status(201).json({ message: "New user created successfully" });
         }
       
    }catch(e){
        res.status(404).json({e: "Error storing user data"});
    }
}