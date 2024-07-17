import React from 'react';
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className='flex justify-between border-b-2 bg-cyan-700 text-white'>
      <div className='lg:py-5 py-4 pl-3'>
        <Link className='lg:text-2xl text-xl' to='/'>Goals Setter</Link>
      </div>
      <div className='flex lg:py-5  py-2 lg:px-3 px-1 items-center'>
        {isAuthenticated ? (
          <>
            <FaUser className='mr-1 lg:text-2xl text-xl' />
            <span className='pr-5 lg:text-2xl text-lg mt-1'>{user?.name}</span>
            <button onClick={handleLogout} className='pr-5 lg:text-2xl text-xl flex items-center'>
              <FaSignOutAlt className='mr-1 lg:text-2xl text-xl' /> Logout
            </button>
          </>
        ) : (
          <>
            <FaUser className='mr-1 text-xl' />
            <Link className='pr-5 lg:text-2xl text-lg mt-1' to='/register'>
              Register
            </Link>
            <FaSignInAlt className='mr-1 lg:text-2xl text-xl' />
            <Link className='pr-5 lg:text-2xl text-xl' to='/login'>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
