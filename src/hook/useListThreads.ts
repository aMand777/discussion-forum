import { useAppSelector } from '../states/store'

const useListThreads = () => {
  const { value, status } = useAppSelector((state) => state.threads)

  return {threads: value, status}
}

export default useListThreads;