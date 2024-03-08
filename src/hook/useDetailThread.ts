import { useAppSelector } from '../states/store.ts';

const useDetailThread = () => {
  const { value: detailThread, status } = useAppSelector((state) => state.detailThread);

  return { ...detailThread, status };
};

export default useDetailThread;
