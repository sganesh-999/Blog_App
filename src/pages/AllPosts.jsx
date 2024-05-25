import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import {useSelector} from 'react-redux'

function AllPosts() {
  const [posts,setPosts] = useState([])
  const authStatus = useSelector((state)=>state.auth.status)
  useEffect(()=>{
    appwriteService.getPosts([]).then((posts)=>{
      if(posts){
        setPosts(posts.documents)
      }
    }
    )
  },[])
  
  if (posts.length === 0) {
    return (
        <div className="w-full py-8 mt-4 text-center bg-white">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        
                        
                        {authStatus && (
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Add post
                            </h1>
                        )}
                        {!authStatus && (
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to view posts
                            </h1>
                        )}
                           
                    
                    </div>
                </div>
            </Container>
        </div>
    )
}
  return (
    <div
    className='w-full py-8'
    >
      <Container>
      <div className='md:flex md:flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 md:w-1/4 '>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
      </Container>
      
    </div>
  )
}

export default AllPosts