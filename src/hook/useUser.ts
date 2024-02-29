import { useSelector } from 'react-redux'
import { RootState } from '../states/store'

const useUser = () => {
  const { data } = useSelector((state: RootState) => state.authUser)

  return { authUser: data }
}

export default useUser