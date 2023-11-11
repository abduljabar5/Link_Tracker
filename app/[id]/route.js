import Link from "@/models/link";
import { connectToDB } from "@/utils/database";
import { redirect } from 'next/navigation'

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const link = await Link.findById(params.id);
        // console.log("🚀 ~ file: route.js:8 ~ GET ~ link:", link)
        if (!link) {
            return new Response.status(404).json({ message: "Link not found" });
        }
        console.log("🚀 ~ file: route.js:15 ~ GET ~ link.originalUrl:", link.originalUrl)

        res.redirect(link.originalUrl);
        // return new Response(JSON.stringify(link), { status: 200 })
    } catch (error) {
        return new Response("Error getting link", error, { status: 500 });
    }
}