import EventDetails from '@/components/EventDetails';
import {Suspense, use} from 'react';

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
