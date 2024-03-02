import { useAppSelector } from '../states/store'

const useListThreads = () => {
  const { value } = useAppSelector((state) => state.threads)

  return {threads: value}
}

export default useListThreads;