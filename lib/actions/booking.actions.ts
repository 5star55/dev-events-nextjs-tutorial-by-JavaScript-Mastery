"use server";

import Booking from "@/database/booking.model";
import Event from "@/database/event.model";
import connectDB from "../mongodb";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function createBooking({ eventId, email }: { eventId: string; email: string; }) {
    try {
        await connectDB();

        const event = await Event.findById(eventId).select("title");
        if (!event) return { success: false, error: "Event not found." };

        const booking = await Booking.create({ eventId, email });

        let emailError: string | undefined;
        try {
            await transporter.sendMail({
                from: `"Events" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: `Confirmed: ${event.title}`,
                html: `<h1>You're booked for ${event.title}!</h1> <p> We will be expectiing you!</p>`,
            });
        } catch (err: any) {
            emailError = err.message;
        }

        return {
            success: true,
            bookingId: booking._id.toString(),
            emailSent: !emailError,
            emailError
        };
    } catch (err: any) {
        return { success: false, error: err.code === 11000 ? "Already booked!" : "Action failed." };
    }
}