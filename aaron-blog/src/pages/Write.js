import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function Write() {

  const state = useLocation().state
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data
    } catch(err) {
      console.log(err);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const imgUrl = await upload();

    try {
      state ? await axios.put(`/posts/${state.id}`, {
        title,
        desc:value
        ,cat
        ,img:file ? imgUrl : ""
      }) 
      : await axios.post(`/posts/`, {
        title,
        desc:value,
        cat,
        img:file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      });
      navigate("/");
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='add mt-[20px] flex gap-[20px]'>

      <div className="content flex-5 flex flex-col gap-[20px]">
        <input value={title} onChange={e=>setTitle(e.target.value)} type="text" placeholder='Title' className='p-[10px] border-gray-300 border-[1px] border-solid'/>
        <div className="editorContainer h-[300px] overflow-scroll border-gray-50 border-[1px] border-solid">
          <ReactQuill theme="snow" value={value} onChange={setValue} className="editor h-[100%] border-none"/>
        </div>
      </div>

      <div className="menu flex-2 flex flex-col gap-[20px]">
        <div className="item border-gray-200 border-[1px] border-solid p-[10px] flex-1 flex flex-col justify-between text-[12px] text-[#555]">
          <h1 className='text-[20px]'>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibilty: </b> Public
          </span>
          <input onChange={e=>setFile(e.target.files[0])} type="file" name="" id="file" className='' style={{display: "none"}}/>
          <label htmlFor="file" className='file underline cursor-pointer first:'>Upload Image</label>
          <div className="buttons flex justify-between ">
            <button className='cursor-pointer text-[teal] bg-[white] border-[1px] border-solid border-[teal] py-[3px] px-[3px]'>Save as a draft</button>
            <button onClick={handleClick} className='cursor-pointer text-[white] bg-[teal] border-[1px] border-solid border-[teal] py-[3px] px-[3px]'>Publish</button>
          </div>
        </div>

        <div className="item border-gray-200 border-[1px] border-solid p-[10px] flex-1 flex flex-col justify-between text-[12px] text-[#555]">
          <h1 className='text-[20px]'>Category</h1>

          <div className='cat flex items-center gap-[2px] text-[teal]'>
            <input type="radio" name="cat" value="art" id="art" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>

          <div className='cat flex items-center gap-[2px] text-[teal]'>
            <input type="radio" checked={cat==="science"} name="cat" value="science" id="science" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="science">Science</label>
          </div>
          
          <div className='cat flex items-center gap-[2px] text-[teal]'>
            <input type="radio" checked={cat==="technology"} name="cat" value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="technology">Technology</label>
          </div>
          
          <div className='cat flex items-center gap-[2px] text-[teal]'>
            <input type="radio" checked={cat==="cinema"} name="cat" value="cinema" id="cinema" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="cinema">Cinema</label>
          </div>
          
          <div className='cat flex items-center gap-[2px] text-[teal]'>
            <input type="radio" checked={cat==="design"} name="cat" value="design" id="design" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="design">Design</label>
          </div>
          
          <div className='cat flex items-center gap-[2px] text-[teal]'>
            <input type="radio" checked={cat==="food"} name="cat" value="food" id="food" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}
