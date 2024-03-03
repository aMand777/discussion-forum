import { useAppSelector, useAppDispatch } from '../../states/store';
import { unSetToast } from '../../states/slice/toast-slice';
import AlertToast from '../alert/AlertToast';

const Toast = () => {
  const dispatch = useAppDispatch();
  const { isOpen, message, status } = useAppSelector((state) => state.toast);
  const handleClickIconClose = () => {
    dispatch(unSetToast());
  };

  return (
    <>
      <div
        className={`toast toast-top sm:toast-bottom duration-500 transition-all z-50 w-full sm:w-fit ${
          isOpen ? 'translate-y-0 sm:translate-y-0' : 'translate-x-full sm:translate-y-full'
        }`}>
        {status === 'info' && (
          <AlertToast
            alert='alert-info'
            message={message}
            onClickButtonClose={handleClickIconClose}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='w-6 h-6 stroke-current shrink-0'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
            </svg>
          </AlertToast>
        )}
        {status === 'success' && (
          <AlertToast
            alert='alert-success'
            message={message}
            onClickButtonClose={handleClickIconClose}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 stroke-current shrink-0'
              fill='none'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </AlertToast>
        )}
        {status === 'warning' && (
          <AlertToast
            alert='alert-warning'
            message={message}
            onClickButtonClose={handleClickIconClose}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 stroke-current shrink-0'
              fill='none'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </AlertToast>
        )}
        {status === 'error' && (
          <AlertToast
            alert='alert-error'
            message={message}
            onClickButtonClose={handleClickIconClose}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 stroke-current shrink-0'
              fill='none'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </AlertToast>
        )}
      </div>
    </>
  );
};

export default Toast;
