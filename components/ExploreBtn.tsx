'use client'
import React from 'react'
import { usePostHog } from 'posthog-js/react'
import Image from 'next/image'
export default function ExploreBtn() {
  const posthog= usePostHog()
  return (
    <div className="flex justify-center w-full items-center ">
    <button  id='explore-btn' className='mt-5 p-3 px-10 mx-auto text-center gap-1 rounded-2xl bg-zinc-900' onClick={()=>posthog.capture("button clicked")}>
        <a href="">Explore more
            <Image src='./icons/arrow-down.svg' alt='arrow-down' width={24} height={24} className='inline'/>
          </a>
    </button></div>
  )
}
