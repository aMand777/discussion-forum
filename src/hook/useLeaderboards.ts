import { useAppSelector } from '../states/store.ts';

const useLeaderBoards = () => {
  const { value: leaderBoards, status } = useAppSelector(
    (state) => state.leaderBoards,
  );

  return { leaderBoards, status };
};

export default useLeaderBoards;
