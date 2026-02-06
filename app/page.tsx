import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import Event, { type IEvent } from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { cacheLife } from "next/cache";

const Home = async () => {
	"use cache";
	cacheLife("hours");

	await connectDB();
	const events = (await Event.find().sort({ createdAt: -1 }).lean()) as IEvent[];

	return (
		<section>
			<h1 className='text-center'>
				The Hub for Every Dev <br />
				Event you Can&apos;t Miss
			</h1>
			<p className='text-center mt-5'>
				Hackatons, Meetups and Conferences, all in one place
			</p>

			<ExploreBtn />

			<div className='mt-20 space-y-7'>
				<h3 id='events'>Featured Events</h3>
				<ul className='events'>
					{events &&
						events.length > 0 &&
						events.map((event: IEvent) => (
							<li key={event._id.toString()}>
								<EventCard
									_id={event._id.toString()}
									title={event.title}
									image={event.image}
									slug={event.slug}
									location={event.location}
									date={event.date}
									time={event.time}
								/>
							</li>
						))}
				</ul>
			</div>
		</section>
	);
};

export default Home;
