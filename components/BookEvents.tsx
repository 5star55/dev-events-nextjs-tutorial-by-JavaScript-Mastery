'use client';
import {createBooking} from '@/lib/actions/booking.actions';
import posthog from 'posthog-js';
import {useState, type FormEvent} from 'react';

type BookEventsProps = {
	eventId: string;
	slug: string;
};

const BookEvents = ({eventId, slug}: BookEventsProps) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading]=useState(false)
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [warning, setWarning] = useState<string | null>(null);
	const [emailError, setEmailError] = useState<string | null>(null);


	const isPosthogLoaded = () =>
		!!(posthog as unknown as {__loaded?: boolean}).__loaded;





	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		setWarning(null);
		setLoading(true)
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
		}finally{
			setLoading(false)
		}
	};


const validateEmail = (value: string) => {
  if (!value) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Enter a valid email address';
  }
  return null;
};

const handleBlur = () => {
  setEmailError(validateEmail(email));
};

	return (
		<div id='book-event'>
			{submitted ? (
				<p className='text-sm'>BOOKED ✅ <br/> Wecome to the community!</p>
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
							onBlur={handleBlur}
						/>
					</div>
					<button
						type='submit'
						className='button-submit'
						disabled={loading}>
						{loading ? 'BOOKING...' :'BOOK EVENT'}
					</button>
					{error && <p className='text-sm text-red-700'>{error}</p>}
					{warning && <p className='text-sm text-amber-700'>{warning}</p>}
					{emailError && <p>{emailError}</p>}
				</form>
			)}
		</div>
	);
};

export default BookEvents;
