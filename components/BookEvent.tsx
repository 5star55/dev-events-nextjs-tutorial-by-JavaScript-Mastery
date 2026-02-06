'use client'

import React from 'react'
import {useState} from 'react'

export default function BookEvent() {
    const [email, setEmail]= useState('')
    const [submitted, setSubmitted]=useState(false)

    const handleSubmit=(e: React.FormEvent)=>{  
        e.preventDefault()
        setTimeout(()=>{
            setSubmitted(true)
        },1000)

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
