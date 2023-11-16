import Link from "@models/link";
import { connectToDB } from "@utils/database";
import { NextResponse } from 'next/server';
import { getGeolocation } from '@utils/geolocation';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const id = request.nextUrl.pathname.split('/').pop();

        const link = await Link.findById(id);
        if (!link) {
            return new Response(null, { status: 404, statusText: "Link not found" });
        }

        const ipAddress = request.headers.get('x-forwarded-for').split(',')[0].trim();
        const geolocationData = await getGeolocation(ipAddress);
        const { city, region, country } = geolocationData;

        await Link.updateOne({ _id: link._id }, {
            $inc: { clicks: 1 },
            genteratedLink: request.url,
            $push:{
                location: {
                timestamp: new Date(),
                ipAddress: ipAddress,
                city: city,
                region: region,
                country: country,
            }
            }
            
        });

        return NextResponse.redirect(link.originalUrl);
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 500, statusText: "Error getting link" });
    }
};
