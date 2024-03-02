import React from 'react';
import { Navigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { POST_LOGIN } from '../services/auth.services.ts';
import { setAccessToken } from '../utils/storage.ts';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import FormLogin from '../components/auth/login/FormLogin.tsx';
// import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../states/store';
import { getUserLoginAsync } from '../states/slice/auth-user-slice.ts';
import LoadingPage from '../components/loading/LoadingPage.tsx';

const FormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.authUser);
  const {isOpen} = useAppSelector((state) => state.toast);
  console.log('isOpen==>', isOpen)
  const [errorResponseMessage, setErrorResponseMessage] = React.useState<string | undefined>('');

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

  const { mutateAsync: postLogin, isPending } = useMutation({
    mutationFn: POST_LOGIN,
    onSuccess: async (data) => {
      const token = data.data.token;
      setAccessToken('accessToken', token);
      dispatch(getUserLoginAsync());
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const { message } = error.data;
      setErrorResponseMessage(message);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await postLogin(data);
  };

  if (isLoading) {
    return <LoadingPage loading='loading-ring loading-lg' />;
  } else if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return (
    <>
      <FormLogin
        loading={isPending}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errorResponse={errorResponseMessage}
      />
    </>
  );
};

export default Login;
