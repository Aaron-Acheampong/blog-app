import React, { useContext, useEffect, useState } from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';

export default function Single() {

  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split('/')[2];

  const {currentUser} = useContext(AuthContext);

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err){
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err){
      console.log(err);
    }
  }

  const getText = (html)=>{
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }


  return (
    <div className='single flex gap-[50px]'>

      <div className="content flex-5 flex flex-col gap-[30px]">
        <img src={`../uploads/${post?.img}`} alt="" className='w-[100%] h-[300px] object-cover'/>

        <div className="user flex items-center gap-[10px] text-[14px]">
          {post.userImg && <img src={post.userImg} alt="" className='w-[50px] h-[50px] rounded-[50%] object-cover'/>}

          <div className="info">
            <span className='font-bold'>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>

          {currentUser.username === post.username && (
            <div className="edit flex gap-[5px]">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" className='w-[20px] h-[20px] cursor-pointer'/>
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" className='w-[20px] h-[20px] cursor-pointer'/>
            </div>
          )}
        </div>
        <h1 className='text-[42px] text-[#333]'>{post.title}</h1>
        <p className='text-justify leading-[30px]'>
          {getText(post.desc)}
        </p>
        
      </div>

      <Menu cat={post.cat}/>
    </div>
  )
}

//src1 ="https://images.pexels.com/photos/403571/pexels-photo-403571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
//src2 ="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"