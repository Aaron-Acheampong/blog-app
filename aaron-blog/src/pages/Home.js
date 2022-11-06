import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err){
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  // const posts = [
  //    {
  //      id: 1,
  //      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //      img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //    },
  //    {
  //      id: 2,
  //      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //      img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //    },
  //    {
  //      id: 3,
  //      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //      img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //    },
  //    {
  //      id: 4,
  //      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //      img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //    },
  //  ];

  const getText = (html)=>{
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (
    <div className='home'>

      <div className="posts mt-[50px] flex flex-col gap-[150px]">
        {posts.map(post=>(
          <div className="post flex gap-[100px] odd:flex-row-reverse" key={post.id}>

            <div className="img relative flex-2 after:content-[''] after:w-[100%] after:h-[100%] after:bg-[#b9e7e7] after:absolute after:top-[20px] after:left-[-20px] after:z-[-1]">
              <img src={`../uploads/${post.img}`} alt="" className='w-[100%] max-h-[400px] object-cover'/>
            </div>

            <div className="content flex-3 flex flex-col justify-between">
              <Link className='link ' to={`/post/${post.id}`}>
                 <h1 className='text-[48px]'>{post.title}</h1>
              </Link>
              <p className='text-[18px]'>{getText(post.desc)}</p>
              <button className='w-max  cursor-pointer py-[10px] px-[20px] bg-white border-[1px] border-solid border-[teal] text-[teal] 
              hover:border-[1px] hover:border-solid hover:border-white hover:bg-[#b9e7e7] hover:text-black'>Read More..</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
