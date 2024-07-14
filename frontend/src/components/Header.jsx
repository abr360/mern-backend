import React from 'react';
import {FaUser,FaSignInAlt,FaSignOutAlt} from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
       <>
       <div className='flex justify-between border-b-2'>
        <div className='py-5 px-3'>
            
        <Link className='text-2xl' to="/">Todo</Link>
        </div>
        <div className='flex py-5 px-3'>
        <FaUser className='mr-1 mt-1 text-xl'/> <Link className='pr-5 text-2xl' to="/register">Register</Link>
        <FaSignInAlt  className='mr-1 mt-1 text-2xl'/><Link className='pr-5 text-2xl' to="/login"> Login</Link> 
        </div>
        </div>
       </>
    );
};

export default Header;