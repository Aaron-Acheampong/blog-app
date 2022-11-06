import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Logo from "../img/logo.png";

export default function Navbar() {

    const {currentUser, logout} = useContext(AuthContext);

  return (
    <div className='navbar '>
      <div className='container py-[10px] flex justify-between items-center'>
        <div className='logo'>
            <Link to="/">
              <img src={Logo} alt="" className='w-[120px]'/>
            </Link>
        </div>
        <div className='links flex gap-[10px] items-center'>
            <Link className='link no-underline text-inherit' to="/?cat=art">
                <h6 className='text-[16px] font-light'>ART</h6>
            </Link>
            <Link className='link no-underline text-inherit' to="/?cat=science">
                <h6 className='text-[16px] font-light'>SCIENCE</h6>
            </Link>
            <Link className='link no-underline text-inherit' to="/?cat=technology">
                <h6 className='text-[16px] font-light'>TECHNOLOGY</h6>
            </Link>
            <Link className='link no-underline text-inherit' to="/?cat=cinema">
                <h6 className='text-[16px] font-light'>CINEMA</h6>
            </Link>
            <Link className='link no-underline text-inherit' to="/?cat=design">
                <h6 className='text-[16px] font-light'>DESIGN</h6>
            </Link>
            <Link className='link no-underline text-inherit' to="/?cat=food">
                <h6 className='text-[16px] font-light'>FOOD</h6>
            </Link>

            <span className='cursor-pointer'>{currentUser?.username}</span>

            {currentUser ? (
                <span className='cursor-pointer' onClick={logout}>Logout</span>
            ) : (
                <Link className='link' to="/login">
                    Login
                </Link>
            )}

            <span className='write bg-[#b9e7e7] w-[50px] h-[50px] rounded-[50%] flex items-center justify-center font-light border-solid border border-[white]  hover:text-[teal] hover:bg-white hover:border hover:border-solid hover:border-[teal] hover:w-[48px] hover:h-[48px]'>
                <Link className='link no-underline text-inherit' to="/write">Write</Link>
            </span>
        </div>
      </div>
    </div>
  )
}
