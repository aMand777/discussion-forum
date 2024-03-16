/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from 'react-hook-form';
import AlertMessage from '../../alert/AlertMessage.tsx';
import { useAppSelector } from '../../../states/store.ts';

type Inputs = {
  email: string;
  password: string;
};

type FormLoginProps = {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
};

function FormLogin({
  register,
  errors,
  onSubmit,
  handleSubmit,
}: FormLoginProps) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { isLoading, message } = useAppSelector((state) => state.auth);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center w-full mt-10">
      <div className="container flex flex-col items-center justify-center">
        <div className="p-1 mb-2 rounded-full bg-secondary text-secondary-content">
          <img src="/forum.png" alt="forum-icon" className="w-16" />
        </div>
        <p className="text-2xl font-semibold">Login</p>
        <form
          data-testid="login-form"
          onSubmit={handleSubmit(onSubmit)}
          className="w-11/12 md:max-w-md"
          noValidate
        >
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <label htmlFor="email" className="flex items-center gap-2 input input-bordered">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="example@mail.com"
              {...register('email')}
            />
          </label>
          {errors.email ? (
            <AlertMessage message={errors.email?.message} />
          ) : (
            message?.toLowerCase().includes('email') && <AlertMessage message={message} />
          )}
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <label htmlFor="password" className="flex items-center gap-2 input input-bordered">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={showPassword ? 'text' : 'password'}
              className="grow"
              placeholder="Password*"
              {...register('password')}
            />
          </label>
          {errors.password ? (
            <AlertMessage message={errors.password?.message} />
          ) : (
            message?.toLowerCase().includes('password') && <AlertMessage message={message} />
          )}
          <label htmlFor="show-password" className="cursor-pointer label">
            <span className="label-text">Show Password</span>
            <input
              onChange={handleCheckboxChange}
              type="checkbox"
              className="checkbox checkbox-accent"
            />
          </label>
          <button disabled={isLoading} type="submit" className="w-full mt-5 btn btn-accent">
            {isLoading && <span className="loading loading-spinner" />}
            {isLoading ? 'loading...' : 'Login'}
          </button>
        </form>
        <div className="flex gap-1 mt-5">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p>Don't have an account?</p>
          <Link to="/auth/register" className="link link-info">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
