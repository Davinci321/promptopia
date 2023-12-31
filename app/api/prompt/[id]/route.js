import { connectToDB } from "@utility/database"
import Prompt from "@models/prompt"

export const GET = async(request, {params}) =>{
try{
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if(!prompt){
        return new Response("Prompt not found",{
            status: 404
        })
    }
    return new Response(JSON.stringify(prompt),{status:200})
}catch(error){
    console.log("error")
    return new Response("Error getting Prompt", {
        status: 500
    })
}
}

export const DELETE = async(request, {params}) =>{
    try{
        await connectToDB();
        const prompt = await Prompt.findByIdAndRemove(params.id).populate("creator")
        return new Response("Prompt deleted successfully", {status: 200})
    }catch(error){
        console.log("error")
        return new Response("Error Deleting Prompt", {
            status: 500
        })
    }
}
export const PATCH = async(request, {params}) =>{
    const {prompt, tag} = await request.json();
    try{
        await connectToDB();
        const existingPrompt = await prompt.findById(params.id);
        if(!existingPrompt){
            return new Response("Prompt not found", {status: 404});
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {status:200})
    }catch(error){
        console.log("error")
        return new Response("Error updating prompt", {
            status: 500
        })
    }
}