"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser} from "@clerk/nextjs";
import Form from "@components/Forms";

const EditPrompt = () => {
    const {user} = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
 
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:"",
        tag:""
    });
    
    useEffect(() => {
        const getPromptDetails = async() =>{
          const response = await fetch(`api/prompt/${promptId}`)
         const data = await response.json();
         setPost({
            prompt: data.prompt,
            tag: data.tag
         })
        }
        if(promptId) getPromptDetails();
    }, [promptId])

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

export default EditPrompt