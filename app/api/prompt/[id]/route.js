import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt"

//GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt)
            return new Response("promt not found !!", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all promts", { status: 500 })
    }
}
//PATCH (update)
export const PATCH = async (request, { params }) => {
    const { title, tag, prompt } = await request.json();

    try {
        await connectToDB();
        const existingPromt = await Prompt.findById(params.id);
        if (!existingPromt)
            return new Response("Prompt not found !!", { status: 404 });

        existingPromt.title = title;
        existingPromt.tag = tag;
        existingPromt.prompt = prompt;

        await existingPromt.save();

        return new Response(JSON.stringify(existingPromt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}
//DELETE 
export const DELETE = async(request,{params})=>{
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt delete successfully",{status:200});
    } catch (error) {
        return new Response("Failed to delete prompt",{status:500})
    }
}