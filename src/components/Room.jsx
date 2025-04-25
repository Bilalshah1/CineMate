import React from 'react'
import go_svg from '../assets/SVGs/room_SVGs/go_svg.svg';

function Room() {
  return (
    <div>
      <div className='w-1/3 flex items-center justify-between border border-gray-700 rounded-xl bg-gray-100 transition-colors duration-300 px-2 py-2'>
        <input
          type='text'
          placeholder='e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          className='flex-1 text-center text-gray-800 font-medium bg-transparent outline-none placeholder-gray-500'
          pattern='^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?[A-Za-z0-9_-]{11}$'
          title='Enter a valid YouTube video URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)'
          onInput={(e) => e.target.value = e.target.value.trim()}
        />
      </div>
    </div>
  )
}

export default Room

