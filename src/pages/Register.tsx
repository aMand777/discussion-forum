import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// import NavAuth from '../../../../components/navigation/NavAuth';
// import FormRegister from '../components/FormRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { POST_REGISTER_USER } from '../services/register.services';
// import { openAlert } from '../../../../utils/handleModal';
import { useNavigate } from 'react-router-dom';
import FormRegister from '../components/auth/register/FormRegister';

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
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorResponse, setErrorResponse] = React.useState<string>('');

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

  const { mutateAsync: registerUser } = useMutation({
    mutationFn: POST_REGISTER_USER,
    onSuccess: () => {
      setLoading(false);
      // openAlert('alert-confirm');
      navigate('/auth/login');
    },
    onError: (error: string) => {
      setLoading(false);
      setErrorResponse(error);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    await registerUser(user);
  };
  return (
    <>
      {/* <NavAuth /> */}
      <FormRegister
        loading={loading}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errorResponse={errorResponse}
      />
    </>
  );
};

export default Register;
