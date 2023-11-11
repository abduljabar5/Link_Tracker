import Link from "@models/link";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const link = await Link.findById(params.id);

        return new Response(JSON.stringify(link), { status: 200 })
    } catch (error) {
        return new Response("Error getting link", { status: 500 });
    }
}