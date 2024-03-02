import { useAppSelector } from '../states/store';

const useDetailThread = () => {
  const { value: detailThread } = useAppSelector((state) => state.detailThread)

  return { ...detailThread }
}

export default useDetailThread