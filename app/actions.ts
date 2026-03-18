"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: { name: String, email: String, message: String }) {
    const { name, email, message } = formData;

    if (!email || !message) {
        return { success: false, error: "Missing payload data." };
    }

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'naveedabs31@gmail.com',
            replyTo: email as string,
            subject: `New Connection Request from ${name}`,
            text: `
                SYSTEM NOTIFICATION: NEW LEAD
                -----------------------------
                NAME: ${name}
                EMAIL: ${email} 
                MESSAGE: ${message}
                -----------------------------
            `,
        });
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}