import React from 'react'

export default function Hero() {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex flex-row justify-center items-start overflow-hidden'>
        {/* Text container */}

        <div className='pb-10 w-full md:w-1/2 text-center md:text-left md:p-10'>
          <h1 className='text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-700 my-2'>
            Developer.
          </h1>

          <h1 className='text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-700 my-2'>
            Engineer.
          </h1>

          <h1 className='text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-700 my-2'>
            Programmer.
          </h1>
        </div>

        {/* Image container */}
        <div className='hidden md:w-1/2 md:block md:p-10'>
          <div className=''>
            <img src='./avatar.jpg' alt='avatar' className='shadow' />
            <div className='flex flex-row justify-between mt-4'>
              <div className='flex flex-row space-x-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-arrow-90deg-up'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z'
                  />
                </svg>
                <p className='font-mono'>That's me</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
