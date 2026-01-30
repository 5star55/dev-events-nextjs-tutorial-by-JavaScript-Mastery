import ExploreBtn from '@/components/ExploreBtn'
import React from 'react'
import EventCard from '@/components/EventCard'
import {events} from '../lib/constants'
import type {Event} from '../lib/constants'

export default function Home() {
  return (
      <section>
        <h1 className='text-center mt-5'>The Hub for Every Dev <br /> Events you can't miss</h1>
        <p className='text-center mt-5'>Hackathons, meetups and Conferences, All in one place</p>
        <ExploreBtn/>

      <div className="mt-20 space-y-7">
        <h3 className='text-center'>Featured Events</h3>
      <ul className="events list-style-none">
      {events.map((event: Event)=>
        <li key={event.title} className='my-7'><EventCard {...event}/></li>
      )}
      </ul>
      </div>
      </section>
  )
}
