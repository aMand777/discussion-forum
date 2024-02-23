import React from 'react';
// import { PiLockKeyDuotone } from 'react-icons/pi';
import { Link } from 'react-router-dom';
// import AlertMessage from '../../../../components/alert/AlertMessage';
import { SubmitHandler, UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import AlertMessage from '../../alert/AlertMessage';
// import useLocale from '../../../../hooks/useLocale';

type Inputs = {
  email: string;
  password: string;
};

type FormLoginProps = {
  loading: boolean | undefined;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  errorResponse: string | undefined;
};

const FormLogin: React.FC<FormLoginProps> = ({
  loading,
  register,
  errors,
  onSubmit,
  handleSubmit,
  errorResponse,
}) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  // const { isLocale } = useLocale();

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex items-center justify-center w-full mt-10'>
      <div className='container flex flex-col items-center justify-center'>
        <div className='p-1 mb-2 rounded-full bg-secondary text-secondary-content'>
          <img src='/forum.png' alt='forum-icon' className='w-16' />
          {/* <PiLockKeyDuotone size={30} /> */}
        </div>
        <p className='text-2xl font-semibold'>Login</p>
        <form onSubmit={handleSubmit(onSubmit)} className='w-11/12 md:max-w-md' noValidate>
          <label className='w-full form-control'>
            <div className='label'>
              <span className='label-text'>Email</span>
            </div>
            <input
              type='email'
              placeholder='example@mail.com'
              className={`${errors.email ? 'input-error' : ''} input input-bordered w-full`}
              {...register('email')}
            />
            {errors.email ? (
              <AlertMessage message={errors.email?.message} />
            ) : (
              errorResponse?.toLowerCase().includes('email') && (
                <AlertMessage message={errorResponse} />
              )
            )}
          </label>
          <label className='w-full form-control'>
            <div className='label'>
              <span className='label-text'>Password</span>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password*'
              className={`${errors.password ? 'input-error' : ''} input input-bordered w-full`}
              {...register('password')}
            />
            {errors.password ? (
              <AlertMessage message={errors.password?.message} />
            ) : (
              errorResponse?.toLowerCase().includes('password') && (
                <AlertMessage message={errorResponse} />
              )
            )}
          </label>
          <label className='cursor-pointer label'>
            <span className='label-text'>Show Password</span>
            <input
              onChange={handleCheckboxChange}
              type='checkbox'
              className='checkbox checkbox-accent'
            />
          </label>
          <button disabled={loading} type='submit' className='w-full mt-5 btn btn-primary'>
            {loading && <span className='loading loading-spinner'></span>}
            {loading ? 'loading...' : 'Login'}
          </button>
        </form>
        <div className='flex gap-1 mt-5'>
          <p>Don't have an account?</p>
          <Link to='/auth/register' className='link link-info'>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
