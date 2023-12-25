import { connectToDB } from "@utility/database";
import User from "@models/user";

export const POST = async(req,res) => {
    const {userData} = req.body;
    try{
        await connectToDB();
        //checking for existing user
        const existingUser = await User.findOne({email: userData.emailAddresses});
        if(existingUser){
            //update existing user information in the database
            existingUser.username = userData.username;
            existingUser.imageUrl = userData.imageUrl;

            await existingUser.save();
            res.status(200).json({ message: "User updated successfully" });
        }else{
            //Create a new user
            User.create({
                email: userData.emailAddresses,
                username: userData.username, 
                imageUrl: userData.imageUrl})
        }
        res.status(200).json({message: "New user created successfully and logged in"})
    }catch(error){
        res.status(404).json({error:"Error storing user data"});
    }
};

