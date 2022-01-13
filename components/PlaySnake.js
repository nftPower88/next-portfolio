import Board from './Board'
import ScoreTable from './ScoreTable'

export default function PlaySnake() {
  return (
    <div className='hidden lg:block bg-[#e7e7e7] -mt-40'>
      <div className='max-w-6xl mx-auto'>
        <header className='flex flex-col md:flex-row pt-20 lg:pt-40 mx-10 md:my-20 lg:my-0 lg:mb-5'>
          <span className='flex flex-row items-end'>
            <h1 className='text-6xl lg:text-9xl md:max-w-4xl font-bold text-gray-800'>
              Play Snake!
            </h1>
            <p className='text-2xl ml-3 mb-2'>and relax ☺️</p>
          </span>
        </header>

        <div className='flex bg-white'>
          <ScoreTable />
          <Board />
        </div>
      </div>
    </div>
  )
}
