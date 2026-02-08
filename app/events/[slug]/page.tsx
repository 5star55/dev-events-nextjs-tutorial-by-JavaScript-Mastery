import EventDetails from '@/components/EventDetails';
import Event from '@/database/event.model';
import connectDB from '@/lib/mongodb';
import type {Metadata} from 'next';
import {isValidObjectId} from 'mongoose';
import {Suspense, use} from 'react';

export async function generateMetadata({
	params,
}: {
	params: Promise<{slug: string}>;
}): Promise<Metadata> {
	const {slug} = await params;

	await connectDB();
	let event = await Event.findOne({slug}).lean();
	if (!event && isValidObjectId(slug)) {
		event = await Event.findById(slug).lean();
	}

	if (!event) {
		return {
			title: 'Event Not Found',
			robots: {index: false, follow: false},
		};
	}

	const title = event.title || 'Event';
	const description =
		event.overview || event.description || 'Event details and schedule.';
	const canonical = `/events/${event.slug || slug}`;
	const imageUrl = event.image;

	return {
		title,
		description,
		alternates: {canonical},
		openGraph: {
			type: 'article',
			url: canonical,
			title,
			description,
			images: imageUrl ? [{url: imageUrl, alt: title}] : undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: imageUrl ? [imageUrl] : undefined,
		},
	};
}

const EventDetailsWrapper = ({
	params,
}: {
	params: Promise<{slug: string}>;
}) => {
	const {slug} = use(params);

	return (
		<EventDetails params={{slug}} />
	);
};

const EventDetailsPage = ({
	params,
}: {
	params: Promise<{slug: string}>;
}) => {
	return (
		<main>
			<Suspense fallback={<div>Loading...</div>}>
				<EventDetailsWrapper params={params} />
			</Suspense>
		</main>
	);
};
export default EventDetailsPage;
