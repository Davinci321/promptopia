"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
  if (!data || data.length === 0) {
    return null; 
  }

  return (
    <div className="mt-16 prompt_layout">
      {
        data.map((post)=> (
          <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
        ))
      }
    </div>
  )
}

export const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const[posts, setPosts] = useState([]);

    const handleSearchChange = () => {

    };

    useEffect(()=>{
      const fetchPosts = async() =>{
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPosts(data)
      }
      fetchPosts();
    },[]);

  return (
     <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="search for a tag or username" className="search_input peer" value={searchText} onChange={handleSearchChange} required/>
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
      <PromptCard/>
     </section>
  )
}