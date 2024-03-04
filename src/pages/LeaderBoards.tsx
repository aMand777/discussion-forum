import useLeaderBoards from '../hook/useLeaderboards';
import CardLeaderBoard from '../components/leaderboards/CardLeaderBoard';

const LeaderBoards = () => {
  const { leaderBoards } = useLeaderBoards();
  return (
    <div className='grid grid-cols-1 gap-5 p-5'>
      {leaderBoards.map((leaderboard) => (
        <CardLeaderBoard
          key={leaderboard.user.id}
          id={leaderboard.user.id}
          name={leaderboard.user.name}
          email={leaderboard.user.email}
          avatar={leaderboard.user.avatar}
          score={leaderboard.score}
        />
      ))}
    </div>
  );
};

export default LeaderBoards;
