import { useSnake } from '../context/SnakeContext'

export default function ScoreTable() {
  const { name, setName, company, setCompany, topScores } = useSnake()

  return (
    <div className='w-1/2 p-5'>
      <div className='flex justify-between'>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          className='font-semibold rounded-md border py-2 px-3 mt-2 mx-4 focus:outline-none focus:ring-2 focus:border-none ring-red-300 w-1/2'
          placeholder='Your Name...'
        />

        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          type='text'
          className='font-semibold rounded-md border py-2 px-3 mt-2 mx-4 focus:outline-none focus:ring-2 focus:border-none ring-red-300 w-1/2'
          placeholder='Company Name...'
        />
      </div>

      <div className='p-3'>
        <div className='overflow-x-auto'>
          <table className='table-auto w-full'>
            <thead className='text-sm font-semibold uppercase text-gray-400'>
              <tr>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Name</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Company</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Score</div>
                </th>
              </tr>
            </thead>
            <tbody className='text-md divide-y divide-gray-100'>
              {topScores.map((item) => (
                <tr key={item.id}>
                  <td className='p-2 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='font-medium text-gray-800'>
                        {item.name}
                      </div>
                    </div>
                  </td>
                  <td className='p-2 whitespace-nowrap'>
                    <div className='text-left'>{item.company}</div>
                  </td>
                  <td className='p-2 whitespace-nowrap'>
                    <div className='text-left font-medium text-green-500'>
                      {item.score}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
