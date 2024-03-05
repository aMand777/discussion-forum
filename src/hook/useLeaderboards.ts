import { useAppSelector } from '../states/store';

const useLeaderBoards = () => {
  const { value: leaderBoards, status} = useAppSelector((state) => state.leaderBoards)

  return { leaderBoards, status }
}

export default useLeaderBoards