"use client"

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () =>{
    const {user} = useUser();

    const [myPosts, setMyPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
      const fetchPosts = async () => {
        if (user?.id) {
          try {
            const response = await fetch(`/api/users/${user.id}/posts`);
            if (!response.ok) {
              throw new Error("Failed to fetch posts");
            }
            const data = await response.json();
            setMyPosts(data);
            console.log("data:", data);
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        }
      };
  
      fetchPosts();
    }, [user?._id]);

    const handleEdit = async(post) =>{
      router.push(`/update-prompt?id=${post._id}`);
    };
    const handleDelete = async(post) =>{
      const hasConfirmed = confirm(
        "Are you sure you want to delete this prompt?"
      );
  
      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE",
          });
  
          const filteredPosts = myPosts.filter((item) => item._id !== post._id);
  
          setMyPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
        <>
        <Profile
        name={"My"}
        description={"Welcome to your personalized profile page"}
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />
        </>
    )
}

export default MyProfile;