import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Register() {

  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:""
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e)=> {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/auth/register", inputs); 
      console.log(res)
      navigate('/login');
    } catch(err) {
      setErr(err.response.data)
    }
  }

  return (
    <div className='auth flex items-center justify-center h-[100vh] bg-[#b9e7e7] flex-col'>
      <h1 className='text-[20px] text-[teal] mb-[20px]'>Register</h1>
      <form className='flex flex-col bg-[white] w-[300px] p-[50px] gap-[20px]'>
        <input className='p-[10px]  border-b border-solid border-gray-300 ' required type="text" placeholder='username' name='username' onChange={handleChange}/>
        <input className='p-[10px]  border-b border-solid border-gray-300 ' required type="email" placeholder='email' name='email' onChange={handleChange} />
        <input className='p-[10px]  border-b border-solid border-gray-300 ' required type="password" placeholder="password" name='password' onChange={handleChange} />
        <button className='p-[10px] border-none bg-[teal] text-[white] cursor-pointer' onClick={handleSubmit}>Register</button>
        {err && <p className='text-[12px] text-[red] text-center'>{err}</p>}
        <span className='text-[12px] text-center'>Do you have an account? <Link className='text-[#7a35eb] underline' to="/login">Login</Link>
        </span>
      </form>
    </div>
  )
}
