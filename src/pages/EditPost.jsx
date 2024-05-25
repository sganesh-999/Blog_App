import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container'
import EditPostForm from '../components/post-form/EditPostForm'
import PostForm from '../components/post-form/PostForm'
import Shimmer from '../components/Shimmer'

function EditPost() {
  const [post, setPosts]=useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{

    if(slug){
      appwriteService.getPost(slug).then((post)=>{
        if(post){
          setPosts(post)
          //console.log('edit post:',post)
        }else{
          navigate('/')
        }
      })
    }
  },[slug,navigate])
  return (
    <div
    className='py-6'
    >
       <Container>
      
       {
        !post?<Shimmer/>: <PostForm post={post} />
       }
        </Container>
    </div>
  )
}

export default EditPost
