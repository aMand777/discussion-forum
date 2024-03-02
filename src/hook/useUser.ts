import { useAppSelector } from '../states/store'

const useUser = () => {
  const { data } = useAppSelector((state) => state.authUser)
  const { value } = useAppSelector((state) => state.users)

  return { authUser: data, users: value }
}

export default useUser