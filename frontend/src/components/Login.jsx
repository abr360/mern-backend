import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { useLoginMutation } from '../features/auth/authService';
import { setLoading, setUser, setError } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetGoals } from '../features/goals/goalSlice';
import { useEffect } from 'react';
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {

  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const user = useSelector((state) => state.auth.user);

  const { data: goals, isLoading, isError, error } = useGetGoals();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const { register, handleSubmit, formState: { errors, isValid, isDirty }, reset } = useForm({
    resolver: yupResolver(schema)
  });

 
  const onSubmit = async (userData) => {
    try {
      dispatch(setLoading());
      const data = await loginMutation.mutateAsync(userData);
      dispatch(setUser(data));
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/');
      }, 1500);

    } catch (error) {
      dispatch(setError(error.message));
      console.error(error);
      setLoginError('Incorrect email or password. Please try again.');
      setTimeout(() => {
        setLoginError('');
      }, 1500);
   
    }
  };
  return (
    <>
      {showAlert && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/20'>
          <div className='bg-cyan-900 rounded-lg p-5'>
            <p className='text-center text-white'>Successfully Logged In</p>
          </div>
        </div>
      )} 
      {loginError && (<div className='fixed inset-0 flex items-center justify-center z-50 bg-black/20'>
          <div className='bg-red-500 rounded-lg p-5'>
            <p className='text-center text-white'>{loginError}</p>
          </div>
        </div>)}
      <form onSubmit={handleSubmit(onSubmit)} className='w-full lg:px-32 px-7 py-5'>
     
        <div className="grid grid-cols-1 gap-5">
          <div className="flex items-center justify-center">
            <FaUser className='text-6xl text-cyan-700' />
          </div>
          <h1 className="text-3xl font-semibold text-center">Login</h1>


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
        </div>
        <input type="submit" className={`mb-3 mt-4 py-3 px-3 rounded-lg xl:mx-auto font-semibold border-2 text-black bg-cyan-100 border-gray-500 ${isValid && isDirty ? 'bg-cyan-700 hover:bg-cyan-600 text-white' : 'bg-cyan-300 cursor-not-allowed'}`} value="Login" disabled={!isValid && !isDirty} />
      </form>
    </>
  );
}

export default Login;
