import nodemailer from 'nodemailer';
export async function sendEmail(city, region, country) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gymhomies1234@gmail.com',
            pass: 'fqljuysmrcpwjezu'
        }
    });
    const mailOptions = {
        from: 'gymhomies1234@gmail.com',
        to: `abduljabar.jobs@gmail.com`,
        subject: `Link Clicked`,
        text: `Location: ${city}, ${region}, (${country})`
    };

    await transporter.sendMail(mailOptions);
}
