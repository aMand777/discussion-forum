import React from 'react'

type TableLeaderBoardsSkeletonProps = {
  loop: number
}

const TableLeaderBoardsSkeleton: React.FC<TableLeaderBoardsSkeletonProps> = ({loop}) => {
  const looping = new Array(loop).fill(null)
  return (
    <>
    {looping.map((_, index) => (
      <tbody key={index}>
        <tr>
          <th>{index + 1}</th>
          <td className='flex items-center gap-3'>
            <div className='avatar'>
              <div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
            </div>
            <div className='skeleton h-4 w-28'></div>
          </td>
          <th>
            <div className='skeleton h-4 w-8'></div>
          </th>
        </tr>
      </tbody>
    ))}
    </>
  );
}

export default TableLeaderBoardsSkeleton