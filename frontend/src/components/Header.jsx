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
      <div className='py-5 px-3'>
        <Link className='text-2xl' to='/'>Goals Setter</Link>
      </div>
      <div className='flex py-5 px-3 items-center'>
        {isAuthenticated ? (
          <>
            <FaUser className='mr-1 text-xl' />
            <span className='pr-5 text-2xl'>{user?.name}</span>
            <button onClick={handleLogout} className='pr-5 text-2xl flex items-center'>
              <FaSignOutAlt className='mr-1' /> Logout
            </button>
          </>
        ) : (
          <>
            <FaUser className='mr-1 text-xl' />
            <Link className='pr-5 text-2xl' to='/register'>
              Register
            </Link>
            <FaSignInAlt className='mr-1 text-2xl' />
            <Link className='pr-5 text-2xl' to='/login'>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
