'use server'

import connectDB from '../mongodb';
import Booking from '@/database/booking.model'
import * as nodemailer from 'nodemailer';

export default async function createBooking({
  eventId,
  email,
}: { eventId: string; email: string }) {
  try {
    await connectDB();
    await Booking.create({ eventId, email });

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom) {
      console.error('SMTP settings are not fully configured.');
      return { success: false, error: 'Email service is not configured.' };
    }

    const transport = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    try {
      await transport.sendMail({
        from: smtpFrom,
        to: [email],
        subject: 'You have been booked for the event',
        html: `
          <h1>Welcome to the community</h1>
          <p>We will be expecting you at the event.</p>
        `,
      });
    } catch (err) {
      console.error('Email send failed:', err);
    }

    return { success: true };
  } catch (e) {
    console.error('create booking failed', e);
    return { success: false, error: e };
  }
}
