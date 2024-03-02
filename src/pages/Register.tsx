import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navigate } from 'react-router-dom';
import FormRegister from '../components/auth/register/FormRegister';
import { useAppDispatch, useAppSelector } from '../states/store';
import { registerUserAsync } from '../states/slice/register-slice'

const FormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .min(3, { message: 'Name must be at least 3 characters' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    dispatch(registerUserAsync(user))
  };

    const { isLoading, message, status } = useAppSelector((state) => state.register)

  if (status === 'success') {
    return <Navigate to='/auth/login' />
  }

  return (
    <>
      <FormRegister
        isLoading={isLoading}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        message={message}
      />
    </>
  );
};

export default Register;
