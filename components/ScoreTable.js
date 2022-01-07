import score from '../pages/api/score'

export default function ScoreTable({ scores }) {
  return (
    <div className='w-full max-w-2xl mx-auto'>
      <div className='p-3'>
        <div className='overflow-x-auto'>
          <table className='table-auto w-full'>
            <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
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
            <tbody className='text-sm divide-y divide-gray-100'>
              {scores.map((item) => (
                <tr>
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
