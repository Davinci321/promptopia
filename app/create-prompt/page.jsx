"use client"

import { useState } from "react";
import { useRouter } from "next/router";
import { useUser} from "@clerk/nextjs";
import Form from "@components/Forms";

const CreatePrompt = () => {
    const {user} = useUser();
 
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:"",
        tag:""
    });
    
    const createPrompt = async (e)=> {
        e.preventDefault();
        setSubmitting(true);

        try{
            const response = await fetch("/api/prompt/new",{
                method: "POST",
                body: JSON.stringify({
                    userId: user?.id,
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if(response.ok){
                Router.push("/");
            }
        }catch(error){
            console.log(error);
        }finally{
            setSubmitting(false);
        }
    }

  return (
    <Form
    type="Create"
    post={post}
    setPost={setPost}
    submiiting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt