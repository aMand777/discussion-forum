import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { POST_REGISTER_USER } from '../services/register.services';
import { useNavigate } from 'react-router-dom';
import FormRegister from '../components/auth/register/FormRegister';
// import { useDispatch } from 'react-redux';
// import { setToast } from '../states/slice/toast-slice'

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
  // const dispatch = useDispatch()
  const navigate = useNavigate();
  const [errorResponseMessage, setErrorResponseMessage] = React.useState<string>('');

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

  const { mutateAsync: registerUser, isPending } = useMutation({
    mutationFn: POST_REGISTER_USER,
    onSuccess: () => {
      // dispatch(setToast({isOpen: true}))
      navigate('/auth/login');
    },
    onError: (error: string) => {
      setErrorResponseMessage(error);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    await registerUser(user);
  };
  return (
    <>
      <FormRegister
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

export default Register;
