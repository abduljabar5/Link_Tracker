import Link from "@models/link";
import { connectToDB } from "@utils/database";
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const id = request.nextUrl.pathname.split('/').pop();

        const link = await Link.findById(id);
        if (!link) {
            return new Response(null, { status: 404, statusText: "Link not found" });
        }
        const ipAddress = request.headers.get('x-forwarded-for').split(',')[0].trim();
       
        
        await Link.updateOne({ _id: link._id }, {
            $inc: { clicks: 1 },
            timestamp: new Date(),
            ipAddress: ipAddress,
            genteratedLink: request.url
        });

        return NextResponse.redirect(link.originalUrl);
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 500, statusText: "Error getting link" });
    }
}
