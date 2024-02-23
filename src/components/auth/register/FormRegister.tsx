import React from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import AlertMessage from '../../alert/AlertMessage';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormRegisterProps = {
  loading: boolean;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  errorResponse: string;
};

const FormRegister: React.FC<FormRegisterProps> = ({
  loading,
  register,
  errors,
  onSubmit,
  handleSubmit,
  errorResponse,
}) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='w-full flex justify-center items-center mt-10'>
      <div className='flex flex-col justify-center items-center container'>
        <div className='bg-secondary rounded-full p-1 text-secondary-content mb-2'>
          <img src='/forum.png' alt='forum-icon' className='w-16'/>
        </div>
        <p className='text-2xl font-semibold'>Register</p>
        <form onSubmit={handleSubmit(onSubmit)} className='w-11/12 md:max-w-md' noValidate>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Name</span>
            </div>
            <input
              type='name'
              placeholder='example@mail.com'
              className={`${errors.name ? 'input-error' : ''} input input-bordered w-full`}
              {...register('name')}
            />
            {errors.name && <AlertMessage message={errors.name.message} />}
          </label>
          <label className='form-control w-full'>
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
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Password</span>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password*'
              className={`${errors.password ? 'input-error' : ''} input input-bordered w-full`}
              {...register('password')}
            />
            {errors.password && <AlertMessage message={errors.password.message} />}
          </label>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Confirm Password</span>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm Password*'
              className={`${
                errors.confirmPassword ? 'input-error' : ''
              } input input-bordered w-full`}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <AlertMessage message={errors.confirmPassword.message} />}
          </label>
          <label className='label cursor-pointer'>
            <span className='label-text'>Show Password</span>
            <input
              onChange={handleCheckboxChange}
              type='checkbox'
              className='checkbox checkbox-accent'
            />
          </label>
          <button disabled={loading} type='submit' className='btn btn-primary w-full mt-5'>
            {loading && <span className='loading loading-spinner'></span>}
            {loading ? 'loading...' : 'Register'}
          </button>
        </form>
        <div className='flex gap-1 mt-5 mb-5'>
          <p>Already have an account?</p>
          <Link to='/auth/login' className='link link-info'>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
