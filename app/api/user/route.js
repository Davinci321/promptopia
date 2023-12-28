import { connectToDB } from "@utility/database";
import User from "@models/user";
import mongoose from "mongoose";

export const POST = async (req) => {
  const { userId, email, username, imageUrl } = await req.json();

  try {
    await connectToDB();
    //checking for existing user
    const existingUser = await User.findOne({ userId: userId });
    if (existingUser) {
      //update existing user information in the database
      existingUser.email = email;
      existingUser.username = username;
      existingUser.imageUrl = imageUrl;

      await existingUser.save();
      return new Response(JSON.stringify({Message: "User updated successfully"}), {status:201});
    
    } else {
      //Create a new user
      await User.create({
        userId,
        email,
        username,
        imageUrl
      });
      return new Response(JSON.stringify({Message: "User created successfully"}), {status:201});
    }
  } catch (error) {
    return new Response(JSON.stringify({error: "Error storing user data"}), {status:500}),
    console.log(error);
  }
};


