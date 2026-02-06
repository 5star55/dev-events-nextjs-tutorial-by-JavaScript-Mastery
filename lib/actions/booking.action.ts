'use server'

import connectDB from '../mongodb';
import Booking from '@/database/booking.model'

export default async function createBooking({
  eventId,
  email,
}: { eventId: string; email: string }) {
  try {
    await connectDB();
    await Booking.create({ eventId, email });

    return { success: true };
  } catch (e) {
    console.error('create booking failed', e);
    return { success: false, error: e };
  }
}
