import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../states/store'
import { setToast } from '../../states/slice/toast-slice'

const ToastRegister = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((state: RootState) => state.toast)
  const handleClickIconClose = () => {
    dispatch(setToast({isOpen: false}))
  }

  return (
    <>
      <div
        className={`toast duration-500 transition-all translate-x-full ${
          isOpen && 'translate-x-0'
        }`}>
        <div className='alert alert-success relative'>
          <span>Register success, please login</span>
          <IoMdClose
            onClick={handleClickIconClose}
            size={25}
            className='absolute top-0 right-0 cursor-pointer'
          />
        </div>
      </div>
    </>
  );
}

export default ToastRegister