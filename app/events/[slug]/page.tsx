import React, { JSXElementConstructor, Suspense } from "react";
import EventCard from '@/components/EventCard'
import { notFound } from "next/navigation";
import Image from 'next/image'
import BookEvent from '@/components/BookEvent'
import getSimilarEventsBySlug from "@/lib/actions/event.actions";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";


export default function EventPage({ params }: RouteParams) {
  return (
    <Suspense fallback={<div>Loading event...</div>}>
      <EventDetails params={params} />
    </Suspense>
  );
}


function EventDetailItem({icon, alt,label}:{icon:string, alt:string, label:string}){
  return <div className='flex-row-gap-2 items-center'>
    <Image src={icon} alt={alt} width={17} height={17} className=""/>
    <p className='px-5 '>{label}</p>
  </div>
}
function EventAgenda({agenda}:{agenda : string[] }){
      return <div>
       <h2>Agenda</h2>
       <ul className="list-none">{agenda.map((agenda, index)=>(
        <li key={index}>{agenda}</li>
       )
       )}

       </ul>
      </div>
}

function EventTags({ tags }: { tags: string[] }) {
  return (
    <div className='flex flex-wrap gap-1.5 flex-row'>
      {tags.map((tag) => (
        <div key={tag} className='pill'>{tag}</div>
      ))}
    </div>
  )
}


async function EventDetails({ params }: RouteParams) {
  const { slug } = await params;

  const requestUrl = `${BASE_URL}/api/events/${slug}`;
  console.log("EventDetails fetch:", requestUrl);

  const res = await fetch(requestUrl, { cache: "no-store" });
  console.log("EventDetails status:", res.status);

  const {event: {title, description,overview,image, date, time, location, venue,tags, organizer, agenda,mode,audience}} = await res.json()
  const bookings=10;

  const similarEvents=  await getSimilarEventsBySlug({slug})
  console.log(similarEvents)
  return (
    <section id="event" className='m-10'>
      <div className='header' >
        <h1>{title}</h1>
        <p>{description}</p>

        <div className='details flex flex-row flex-wrap'>
          <div className="flex-1 content">
            <Image src={image as string} alt={title} width={800} height={800} className='banner'/>

            <section className='flex-col-gap-2'>
              <h2>Overview</h2>
              <p>{overview}</p>
            </section>
            <section className='flex-col-gap-2'>
              <h2>Event Details</h2>
            <EventDetailItem icon='/icons/calendar.svg' alt='calendar' label={date}/>
             <EventDetailItem icon='/icons/clock.svg' alt='time' label={time}/>
             <EventDetailItem icon='/icons/pin.svg' alt='location' label={location}/>
             <EventDetailItem icon='/icons/mode.svg' alt='mode' label={mode}/>
             <EventDetailItem icon='/icons/audience.svg' alt='audience' label={audience}/>
              <EventAgenda agenda={agenda}/>
              <section className='flex-col-gap-2'>
                <h2>About the organizer</h2>
                <p>{organizer}</p>
                <EventTags tags={tags}/>
              </section>
            </section>
          </div>
          <aside className='booking'>
           <div className="signup-card">
              <h2>Book Your Spot</h2>
              {bookings > 0 
              ? (
                <p>Join {bookings} who have already booked their spot!</p>)
              : <p>Be the first to book your spot!</p>
              }
              <BookEvent/>
           </div>

          </aside>

        </div>

      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className='events'>
          {similarEvents.length>0 && similarEvents.map(similarEvent => ( 
            <EventCard key={similarEvent.title} {...similarEvent}/>
          ))}
        </div>
      </div>
    </section>
  );
}
