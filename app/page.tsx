import ExploreBtn from '@/components/ExploreBtn'
import React from 'react'
import EventCard from '@/components/EventCard'
// import {events} from '../lib/constants'
import type {Event} from '../lib/constants'
import { cacheLife } from 'next/cache'

export default async function Home() {
  'use cache'
  cacheLife('hours')
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const response = await fetch(`${BASE_URL}/api/events`, {next:{revalidate:60}})
  const {events}= await response.json()
  

  return (
      <section>
        <h1 className='text-center mt-5'>The Hub for Every Dev <br /> Events you can't miss</h1>
        <p className='text-center mt-5'>Hackathons, meetups and Conferences, All in one place</p>
        <ExploreBtn/>

      <div className="mt-20 space-y-7">
        <h3 className='text-center'>Featured Events</h3>
      <ul className="events list-none">
      {events && events.length>0 && events.map((event: Event)=>
        <li key={event.title} className='my-7'><EventCard {...event}/></li>
      )}
      </ul>
      </div>
      </section>
  )
}
