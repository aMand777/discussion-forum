import React from 'react';
import { Navigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormLogin from '../components/auth/login/FormLogin.tsx';
import { useAppSelector, useAppDispatch } from '../states/store.ts';
import { postUserLoginAsync } from '../states/slice/auth-slice.ts';
import { setInitialRegisterState } from '../states/slice/register-slice.ts';
import LoadingPage from '../components/loading/LoadingPage.tsx';
import { setToast } from '../states/slice/toast-slice.ts';

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setInitialRegisterState());
  }, []);

  const { isAuthenticated, isPreload } = useAppSelector(
    (state) => state.preload,
  );
  const { authUser } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(postUserLoginAsync(data));
  };

  if (isPreload) {
    return <LoadingPage type="loading-ring" size="loading-lg" />;
    // eslint-disable-next-line no-else-return
  } else if (isAuthenticated) {
    dispatch(
      setToast({
        status: 'success',
        message: `Welcome back, ${authUser.name}`,
      }),
    );
    return <Navigate to="/" replace />;
  }

  return (
    <FormLogin
      register={register}
      errors={errors}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    />
  );
}

export default Login;
