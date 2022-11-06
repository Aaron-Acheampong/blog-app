import React from 'react';
import Logo from '../img/logo.png';

export default function Footer() {
  return (
    <footer className='mt-[100px] p-[20px] bg-[#b9e7e7] flex items-center justify-between font-[12px]'>
      <img src={Logo} alt="" className='h-[50px]'/>
      <span>Made with love and <b>React.js</b>.</span>
    </footer>
  )
}
