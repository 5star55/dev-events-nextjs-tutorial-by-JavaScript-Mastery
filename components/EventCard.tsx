import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props={
    title:string;
    image:string;
    slug: string;
    location: string;
    date: string;
    time: string;

}
const EventCard = ({title,image,slug,location,date,time}: Props) => {
  return (
    <div>
        <Link href={`/events/${slug}`}>
        <Image src={image} alt={title} width={410} height={300}/>
         <div className='flex flex-row gap-2'>
          <Image src='/icons/pin.svg' alt='location' height={14} width={14}/>
          <p>{location}</p>
        </div>
        <p className='title'>{title}</p>
        <div className=' flex gap-2 date-time text-sm'>
          <Image src='/icons/calendar.svg' alt='date' width={14} height={14} className=''/>
          <p>{date}</p>
        </div>
        <div className='flex gap-2 date-time text-sm'>
          <Image src='/icons/clock.svg' alt='date' width={14} height={14} className=''/>
          <p>{time}</p>
        </div>
       
        </Link>
    </div>
  )
}

export default EventCard