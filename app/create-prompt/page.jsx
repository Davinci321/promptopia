"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser} from "@clerk/nextjs";
import Form from "@components/Forms";

const CreatePrompt = () => {
    const {user} = useUser();
    const router = useRouter();
 
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
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(response.ok){
                router.push("/");
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