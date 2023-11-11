import { connectToDB } from '@/utils/database';
import Link from '@/models/link';
export const POST = async (req, res) => {

    const {userInput, userId} = await req.json();
    try {
        console.log('link:', userInput, userId);
        await connectToDB();
        console.log('test');
        const newLink = new Link({
            creator: userId,
            originalUrl: userInput,

        })
        await newLink.save();

        return new Response(JSON.stringify(newLink), {status: 201})
    } catch (error){
        return new Response("Failed to create a new prompt", {status:500})
    }
}   