const axios = require('axios');

export async function getGeolocation (ipAddress){
    const API_TOKEN = 'fd7255deb99746'; // Replace with your IPinfo token
    const url = `https://ipinfo.io/${ipAddress}/json?token=${API_TOKEN}`;

    try {
        const response = await axios.get(url);
        return response.data; // This will contain location data
    } catch (error) {
        console.error('Error fetching IP geolocation:', error);
        return null; // Handle errors or return null
    }
};

