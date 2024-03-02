import { useAppSelector } from '../states/store'

const useUser = () => {
  const { authUser } = useAppSelector((state) => state.user)
  const { users } = useAppSelector((state) => state.users)

  return { authUser, users }
}

export default useUser