import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { FaUser } from 'react-icons/fa';
import { useRegisterMutation } from '../features/auth/authService';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetGoals } from '../features/goals/goalSlice';
import { useEffect } from 'react';
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerMutation = useRegisterMutation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid, isDirty }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const user = useSelector((state) => state.auth.user);

  const { data: goals, isLoading, isError, error } = useGetGoals();
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
      // Use the mutateAsync method directly in the component
      const result = await registerMutation.mutateAsync(data);
     console.log('Result:', result); // Check the result for debugging
      dispatch(setUser(result));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1500);
      reset();
      navigate('/');

    } catch (error) {
      // Handle any errors
      console.error(error);

    }
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
      <form onSubmit={handleSubmit(onSubmit)} className='w-full lg:px-32 px-7 py-5'>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div className="flex items-center justify-center">
            <FaUser className='text-6xl text-cyan-700' />
          </div>
          <h1 className="text-3xl font-semibold text-center">Register</h1>
          <div>
            <input {...register('name')} type="text" placeholder="Your Name" className="w-full p-3 bg-cyan-50 rounded-lg border-2 border-cyan-500" />
            {errors.name && <p className='from-gray-950 mb-2'>{errors.name.message}</p>}
          </div>
          <div>
            <input {...register('email')} type="email" placeholder="Your Email" className="w-full p-3 bg-cyan-50 rounded-lg border-2 border-cyan-500" />
            {errors.email && <p className='from-gray-950 mb-2'>{errors.email.message}</p>}
          </div>
          <div className="relative">
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
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            {errors.password && <p className='text-red-500 mb-2'>{errors.password.message}</p>}
          </div>
          <div className="relative">
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Your Confirm Password"
              className="w-full p-3 bg-cyan-50 rounded-lg border-2 border-cyan-500"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-3.5 text-xl"
            >
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            {errors.confirmPassword && <p className='text-red-500 mb-2'>{errors.confirmPassword.message}</p>}
          </div>
        </div>
        <input type="submit" className={`mb-3 mt-4 py-3 px-3 rounded-lg xl:mx-auto font-semibold border-2 text-black bg-cyan-100 border-gray-500 ${isValid && isDirty ? 'bg-cyan-700 hover:bg-cyan-600 text-white' : 'bg-cyan-300 cursor-not-allowed'}`} value="Register" disabled={!isValid && !isDirty} />
      </form>
    </>
  );
}

export default Register;
