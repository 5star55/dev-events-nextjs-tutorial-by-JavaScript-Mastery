'use client';
import {createBooking} from '@/lib/actions/booking.actions';
import posthog from 'posthog-js';
import {useState, type FormEvent} from 'react';
import sendEmail from '@/lib/actions/booking.actions'

type BookEventsProps = {
	eventId: string;
	slug: string;
};

const BookEvents = ({eventId, slug}: BookEventsProps) => {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [warning, setWarning] = useState<string | null>(null);
	const isPosthogLoaded = () =>
		!!(posthog as unknown as {__loaded?: boolean}).__loaded;





	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		setWarning(null);
		try {
			const {success, error, emailError} = await createBooking({eventId, email});
			if (success) {
				setSubmitted(true);
				if (emailError) {
					setWarning(
						`Booking saved, but email failed to send: ${emailError}`
					);
				}
				if (isPosthogLoaded()) {
					posthog.capture('event_booked', {eventId, slug, email});
				}
			} else {
				console.error(error || 'Booking creation failed');
				setError(error || 'Booking creation failed');
				if (isPosthogLoaded()) {
					posthog.captureException(error || 'Booking creation failed');
				}
			}
		} catch (err) {
			console.error('Booking request failed', err);
			setError('Request failed. Please try again.');
			if (isPosthogLoaded()) {
				posthog.captureException('Booking request failed');
			}
		}
	};

	return (
		<div id='book-event'>
			{submitted ? (
				<p className='text-sm'>Thank you for signing up!</p>
			) : (
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='email'>Email:</label>
						<input
							type='email'
							id='email'
							value={email}
							placeholder='Enter your email address'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<button
						type='submit'
						className='button-submit'>
						Submit
					</button>
					{error && <p className='text-sm text-red-600'>{error}</p>}
					{warning && <p className='text-sm text-amber-700'>{warning}</p>}
				</form>
			)}
		</div>
	);
};

export default BookEvents;
