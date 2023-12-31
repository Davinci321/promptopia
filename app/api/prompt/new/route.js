import { connectToDB } from "@utility/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const POST = async(req, res) =>{
    try{
        const {userId, prompt,tag} = await req.json();

        await connectToDB();
        
        const user = await User.findOne({ userId });

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        const newPrompt = new Prompt({creator: user._id, prompt, tag})
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201});
    }catch(e){
        return new Response("Failed to create a new prompt", {status: 500}),
        console.log(e);
    }
}