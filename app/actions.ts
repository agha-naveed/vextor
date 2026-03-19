"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: { name: String, email: String, message: String }) {
    const { name, email, message } = formData;

    if (!email || !message) {
        return { success: false, error: "Missing payload data." };
    }

    const cleanName = name?.trim() || "Unknown";
    const cleanEmail = email?.trim() || "";
    const cleanMessage = message?.trim() || "";

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
        console.error("Transmission rejected: Invalid email format ->", cleanEmail);
        return { success: false, error: "Invalid email format." };
    }

    try {
        const response = await resend.emails.send({
            from: 'VextorAI <onboarding@resend.dev>',
            to: 'naveedabs31@gmail.com',
            replyTo: cleanEmail,
            subject: `New Connection Request from ${cleanName}`,
            text: `SYSTEM NOTIFICATION: NEW LEAD
            -----------------------------
            NAME: ${cleanName}
            EMAIL: ${cleanEmail} 
            MESSAGE: ${cleanMessage}
            -----------------------------
            `,
        });
        if (response.error) {
            return { success: false };
        }
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}