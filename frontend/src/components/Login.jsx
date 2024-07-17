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
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor:'rgb(207 250 254)'
      }}>
        <div style={{ 
          border: '4px solid #f3f3f3', 
          borderTop: '4px solid #3498db', 
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 2s linear infinite' 
        }}>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
}
 
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
      {loginError && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/20'>
          <div className='bg-red-500 rounded-lg p-5'>
            <p className='text-center text-white'>{loginError}</p>
          </div>
        </div>
      )}
      <div className='flex lg:items-center items-start *:mt-28 justify-center min-h-screen bg-cyan-100'>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white  px-8 py-4 rounded-lg shadow-md w-full max-w-md mx-6'>
          <div className="flex items-center justify-center mb-5">
            <FaUser className='text-6xl text-cyan-700' />
          </div>
          <h1 className="text-3xl font-semibold text-center mb-5">Login</h1>
          <div className="mb-4">
            <input {...register('email')} type="email" placeholder="Your Email" className="w-full p-3 bg-cyan-50 rounded-lg border-2 border-cyan-500" />
          
            {errors.email && <p className='text-red-500 mb-2'>{errors.email.message}</p>}
        
            
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
          <input type="submit" className={`w-full py-3 px-3 rounded-lg font-semibold border-2 text-black ${isValid && isDirty ? 'bg-cyan-700 hover:bg-cyan-600 text-white' : 'bg-cyan-300 cursor-not-allowed'}`} value="Login" disabled={!isValid && !isDirty} />
        </form>
      </div>
    </>
  );
}

export default Login;
