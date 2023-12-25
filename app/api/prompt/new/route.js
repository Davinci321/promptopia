import { connectToDB } from "@utility/database";
import Prompt from "@models/prompt"

export const POST = async(req, res) =>{
    const {userId, prompt,tag} = await req.json();

    try{
        await connectToDB();
    
    }catch(e){
        console.log(e);
    }
}