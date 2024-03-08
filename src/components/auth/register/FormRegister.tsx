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

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormRegisterProps = {
  isLoading: boolean;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  message: string;
};

function FormRegister({
  isLoading,
  register,
  errors,
  onSubmit,
  handleSubmit,
  message,
}: FormRegisterProps) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="flex flex-col justify-center items-center container">
        <div className="bg-secondary rounded-full p-1 text-secondary-content mb-2">
          <img src="/forum.png" alt="forum-icon" className="w-16" />
        </div>
        <p className="text-2xl font-semibold">Register</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-11/12 md:max-w-md"
          noValidate
        >
          <label
            htmlFor="username"
            className="input input-bordered flex items-center gap-2 mt-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              {...register('name')}
            />
          </label>
          {errors.name && <AlertMessage message={errors.name.message} />}
          <label
            htmlFor="email"
            className="input input-bordered flex items-center gap-2 mt-5"
          >
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
              placeholder="Email"
              {...register('email')}
            />
          </label>
          {errors.email ? (
            <AlertMessage message={errors.email?.message} />
          ) : (
            message?.toLowerCase().includes('email') && (
              <AlertMessage message={message} />
            )
          )}
          <label
            htmlFor="password"
            className="input input-bordered flex items-center gap-2 mt-5"
          >
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
          {errors.password && (
            <AlertMessage message={errors.password.message} />
          )}
          <label
            htmlFor="confirm-password"
            className="input input-bordered flex items-center gap-2 mt-5"
          >
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
              placeholder="Confirm Password*"
              {...register('confirmPassword')}
            />
          </label>
          {errors.confirmPassword && (
            <AlertMessage message={errors.confirmPassword.message} />
          )}
          <label htmlFor="show-password" className="label cursor-pointer">
            <span className="label-text">Show Password</span>
            <input
              onChange={handleCheckboxChange}
              type="checkbox"
              className="checkbox checkbox-accent"
            />
          </label>
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-accent w-full mt-5"
          >
            {isLoading && <span className="loading loading-spinner" />}
            {isLoading ? 'loading...' : 'Register'}
          </button>
        </form>
        <div className="flex gap-1 mt-5 mb-5">
          <p>Already have an account?</p>
          <Link to="/auth/login" className="link link-info">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FormRegister;
