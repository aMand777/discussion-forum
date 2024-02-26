import { useSelector } from 'react-redux';
import { RootState } from '../../states/store';

const TableLeaderBoards = () => {
  const { leaderBoards } = useSelector((state: RootState) => state);

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr className='bg-base-200'>
              <th>No</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          {leaderBoards.value.map((leaderboard, index) => (
            <tbody key={leaderboard.user.id}>
              {/* row 1 */}
              <tr>
                <th>{index + 1}</th>
                <td className='flex items-center gap-3'>
                  <div className='avatar'>
                    <div className='w-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                      <img src={leaderboard.user.avatar} />
                    </div>
                  </div>
                  <span className='font-semibold text-base'>{leaderboard.user.name}</span>
                </td>
                <th>{leaderboard.score}</th>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default TableLeaderBoards;
