import Prompt from "@models/prompt";
import { connectToDB } from "@utility/database";

export const GET = async(request)=>{
    try{
        await connectToDB();
        const Prompts = await Prompt.find({}).populate("creator");
        return new Response(JSON.stringify(Prompts),{status: 200})
    }catch(error){
        console.log("Error getting all Prompts:", error);
        return new Response("Error getting all Prompts", {status:500})
    }
}