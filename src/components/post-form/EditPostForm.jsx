import React, { useCallback,useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams,useNavigate } from 'react-router-dom'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import RTE from '../RTE'
import appwriteService from "../../appwrite/config";

import { useSelector } from "react-redux";

export default function EditPostForm() {
    const [post, setPosts]=useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState();

    useEffect(()=>{
  
      if(slug){
        appwriteService.getPost(slug).then((post)=>{
          if(post){
            setPosts(JSON.parse(JSON.stringify(post)))
            
            
            // alert('post loaded')
          }
          else{
            //console.log('not loaded')
          }
        })
      }
    },[slug,navigate])


    
 
   
    const { register, handleSubmit, watch, setValue, control, getValues } = 
    useForm({
        defaultValues: {
            title:post?.title || "ganesh",
            slug: post?.$id || "ganesh",
            content: post?.content || "ganesh",
            status: post?.status || "active",
        },
    })
    //console.log(post.title)
    // {post ? //console.log(register) : //('empty')}
    // const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
            //console.log('data',data)
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            //console.log(file)
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                //console.log(dbPost)
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    //title change
   
    // onTitleChange(e){
    //     const {name, value} = e.target;
    //    this.setState({[name]: value});
  
    // }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
            <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    //defaultValue={post.title}
                    value={post.title} 
                    onChange={onTitleChange}
                    
                    {...register("title", { required: true })}
                   
                    
                />
                
               
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 hidden"

                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE  label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}