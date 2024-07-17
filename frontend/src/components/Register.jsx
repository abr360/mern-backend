import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { FaUser } from 'react-icons/fa';
import { useRegisterMutation } from '../features/auth/authService';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [isError, setIsError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerMutation = useRegisterMutation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid, isDirty }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    try {
      const result = await registerMutation.mutateAsync(data);
      dispatch(setUser(result));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1500);
      reset();
      navigate('/');
    } catch (error) {
      console.error(error);
      setIsError(error.message);
    }
  };

  const handleEmailChange = () => {
    setIsError('');
  };

  return (
    <>
      {showAlert && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/20'>
          <div className='bg-cyan-900 rounded-lg p-5'>
            <p className='text-center text-white'>Successfully Registered</p>
          </div>
        </div>
      )}
 
      <div className='flex lg:items-center items-start pt-28 justify-center min-h-screen bg-cyan-100'>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white px-8 py-4 rounded-lg shadow-md w-full max-w-md mx-6'>
          <div className="flex items-center justify-center mb-5">
            <FaUser className='text-6xl text-cyan-700' />
          </div>
          <h1 className="text-3xl font-semibold text-center mb-5">Register</h1>
          <div className="mb-4">
            <input {...register('name')} type="text" placeholder="Your Name" className="w-full p-3 bg-cyan-50 rounded-lg border-2 border-cyan-500" />
            {errors.name && <p className='text-red-500 mb-2'>{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <input {...register('email')} type="email" placeholder="Your Email" className="w-full p-3 bg-cyan-50 rounded-lg border-2 border-cyan-500" onChange={handleEmailChange} />
            {errors.email && <p className='text-red-500 mb-2'>{errors.email.message}</p>}
            {isError && <p className='text-red-500 mb-2'>{isError}</p>}
          </div>
          <div className="relative mb-4">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Your Password"
              className="w-full p-3 bg-cyan-50 rounded-lg border-2 border-cyan-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3.5 text-xl"
            >
              {showPassword ? <AiFillEyeInvisible className='text-cyan-700' /> : <AiFillEye className='text-cyan-700' />}
            </button>
            {errors.password && <p className='text-red-500 mb-2'>{errors.password.message}</p>}
          </div>
          <div className="relative mb-4">
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="w-full p-3 bg-cyan-50 rounded-lg border-2 border-cyan-500"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-3.5 text-xl"
            >
              {showConfirmPassword ? <AiFillEyeInvisible className='text-cyan-700' /> : <AiFillEye className='text-cyan-700' />}
            </button>
            {errors.confirmPassword && <p className='text-red-500 mb-2'>{errors.confirmPassword.message}</p>}
          </div>
          <input type="submit" className={`w-full py-3 px-3 rounded-lg font-semibold border-2 text-black ${isValid && isDirty ? 'bg-cyan-700 hover:bg-cyan-600 text-white' : 'bg-cyan-300 cursor-not-allowed'}`} value="Register" disabled={!isValid && !isDirty} />
        </form>
      </div>
    </>
  );
}

export default Register;
