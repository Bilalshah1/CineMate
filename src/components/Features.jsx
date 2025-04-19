import React from 'react'
import features_svg from '../assets/features_svg.svg';
import sync_svg from '../assets/sync_svg.svg';
import chat_svg from '../assets/chat_svg.svg';
import reactions_svg from '../assets/reactions_svg.svg';
import youtube_svg from '../assets/youtube_svg.svg';

function Features() {
  return (
    <>
    <div className='bg-gradient-to-l from-blue-400 via-purple-500 to-red-300 overflow-hidden'>
      <div className="flex items-center justify-center w-full mt-5">
        <div className="flex-1 h-0.5 bg-gray-700"></div>
        <div className="flex gap-2 items-center mx-4">
          <img className="w-6 h-6" src={features_svg} alt="" />
          <p className="text-2xl font-bold">Features</p>
        </div>
        <div className="flex-1 h-0.5 bg-gray-700"></div>
      </div>
      <div className='relative z-10 flex items-center justify-between gap-4 py-8 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center gap-2 m-2'>
            <img className="md:w-18 md:h-18 w-15 h-15" src={youtube_svg} alt="" />
            <p className='font-semibold md:text-xl'>Youtube</p>
            <p className='tracking-tight text-sm'>Stream YouTube videos in perfect sync with the crew. From cat clips to epic trailers, watch it all together, no lag.</p>
        </div>
        <div className='flex flex-col items-center gap-2 m-2'>
            <img className="md:w-18 md:h-18 w-15 h-15" src={sync_svg} alt="" />
            <p className='font-semibold md:text-xl'>Sync</p>
            <p className='tracking-tight text-sm'>Starts, stops, and seeks are synchronized to everyone, so take those restroom and snack breaks without falling behind.</p>
            
        </div>
        <div className='flex flex-col items-center gap-2 m-2'>
            <img className="md:w-18 md:h-18 w-15 h-15" src={chat_svg} alt="" />
            <p className='font-semibold md:text-xl'>Chat</p>
            <p className='tracking-tight text-sm'>Chat with everyone in your room to keep the vibes high. Share memes, trade inside jokes, or roast that one friend.</p>
        </div>
        <div className='flex flex-col items-center gap-2 m-2'>
            <img className="md:w-18 md:h-18 w-15 h-15" src={reactions_svg} alt="" />
            <p className='font-semibold md:text-xl'>React</p>
            <p className='tracking-tight text-sm'>Drop emojis, GIFs, or live reactions to hype up the moment. Laugh and scream—let everyone feel the vibe.</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Features