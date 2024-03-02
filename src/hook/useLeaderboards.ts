import { useAppSelector } from '../states/store';

const useLeaderBoards = () => {
  const { value: leaderBoards} = useAppSelector((state) => state.leaderBoards)

  return { leaderBoards }
}

export default useLeaderBoards