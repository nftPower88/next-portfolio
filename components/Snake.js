import React from 'react'
import Board from './Board'

export default function Snake({ scores }) {
  return (
    <div className='hidden lg:block bg-[#e7e7e7] -mt-40'>
      <div className='max-w-6xl mx-auto'>
        <header className='flex flex-col md:flex-row pt-20 lg:pt-40 mx-10 md:my-20 lg:my-0'>
          <h1 className='text-6xl lg:text-9xl md:max-w-4xl font-bold text-gray-600'>
            Play Snake!
          </h1>
        </header>

        <div className=''>
          <Board scores={scores} />
        </div>
      </div>
    </div>
  )
}
