"use Client"

import {useState, useEffect} from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) =>{
    const {user} = useUser();
    const pathName = usePathname();
    const router = useRouter();

    const [copied, setCopied] = useState("");

    const handleProfileClick = () => {
        console.log(post);
    
        if (post.creator._id === user.id) return router.push("/profile");
    
        router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
      };

    const handleCopy = () =>{
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(()=>setCopied(""),3000)
    };

    if (!post || !post.creator || !post.creator.imageUrl) {
        return (
          <div>
          </div>
        );
      }else{
        return (
            <div className="prompt_card">
                <div className="flex justify-between items-start gap-5">
                    <div className=" flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image 
                src={post.creator.imageUrl}
                alt="user_image"
                width={40}
                height={40}
                className="rounded-full object-contain"
                priority={true}
                />
    
                <div>
                    <h3 className="font-satoshi text-gray-900 font-semibold">{post.creator?.username || "No Username"}</h3>
                    <p className="font-inter text-md text-gray-500">{post.creator?.email || "No Email"}</p>
                </div>
                    </div>
                    
                    <div className="copy_btn" onClick={handleCopy}>
                    <Image
                    src={copied === post.prompt? "/assets/icons/tick.svg":"assets/icons/copy.svg"}
                    height={12}
                    width={12}/>
                    </div>
                </div>
                <p className="text-gray-700 text-sm my-4 font-satoshi">{post.prompt}</p>
                <p className="cursor-pointer font-inter text-sm blue_gradient" onClick={()=>handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>

            {user?.id === post.creator.id && pathName ==="/profile" && (
                <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                <p
                  className='font-inter text-sm green_gradient cursor-pointer'
                  onClick={handleEdit}
                >
                  Edit
                </p>
                <p
                  className='font-inter text-sm orange_gradient cursor-pointer'
                  onClick={handleDelete}
                >
                  Delete
                </p>
              </div>
            )}
            </div>
        )
        }  
}

export default PromptCard