import { connectToDB } from "@utility/database";
import Prompt from "@models/prompt";

export const GET = async({ params }) => {
    try{
        if (!params || !params.id) {
            throw new Error('Invalid or missing parameters');
        }
        console.log("Params:",params)


        await connectToDB();

        const prompts = await Prompt.find({
            creator: params.id
        }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200})
    }catch(error){
        console.log(error);
        return new Response("Failed to fetch prompts created by user",{status: 500})
    }
};