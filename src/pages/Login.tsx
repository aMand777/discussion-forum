import { Navigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormLogin from '../components/auth/login/FormLogin.tsx';
import { useAppSelector, useAppDispatch } from '../states/store';
import { postUserLoginAsync } from '../states/slice/auth-slice.ts';
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
  const { isAuthenticated, isPreload } = useAppSelector((state) => state.preload);

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
    return <LoadingPage loading='loading-ring loading-lg' />;
  } else if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return (
    <>
      <FormLogin
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Login;
