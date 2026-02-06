'use client'

import createBooking from '@/lib/actions/booking.action'
import posthog from 'posthog-js'
import React from 'react'
import {useState} from 'react'

export default function BookEvent({eventId, slug}:{eventId:string, slug: string}) {
    const [email, setEmail]= useState('')
    const [submitted, setSubmitted]=useState(false)

    const handleSubmit= async (e: React.FormEvent)=>{
         e.preventDefault() 
        const {success} = await createBooking({eventId,email})
        if(success) {
            setSubmitted(true)
            posthog.capture('event booked',{eventId, slug, email})
        }
        else {
            console.log('booking creation failed')
            posthog.captureException('booking creation failed')
        }
    }

  return (
    <div id='book-event'>
        {submitted ? (
         <p>Thank you for signing up!</p>)
         : (<form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email">Email Address</label>
            <input type="email"  className='block bg-gray-800 my-3 py-1.5 border-2 rounded-lg '  id='email' placeholder='Enter your email address!' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <button type='submit' className='button-submit'>Submit</button>
            </div>
         </form>)
        }
    </div>
  )
}
