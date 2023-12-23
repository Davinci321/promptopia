"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect} from "react";
import {useClerk, useUser} from "@clerk/nextjs";
import axios from "axios";


const Nav =  () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const { signOut } = useClerk();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log("User data available: ", user)

    // Check if the user has an email address
    if (user.emailAddresses) {
      //send user data to backend for storage
      //send user data to backend for storage
      axios.post('/api/users', {userData: user})
      .then(response => {
        console.log("data successfully stored", response)
      }).catch(error=>{
        console.log("error storing user data:",error)
      });
    }
  }
  },[user])
  
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button'  className='outline_btn' onClick={()=> signOut()}>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={user.imageUrl || '/assets/images/empty-image.png'}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
          <Link href="/sign-in">
                <button
                  type='button'
                  className='black_btn'
                >
                  Sign in
                </button>
          </Link>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {user ?(
          <div className='flex'>
            <Image
              src={user.imageUrl || '/assets/images/empty-image.png'}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                

                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false),
                    signOut()
                  }}
                  className='mt-2 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/sign-in">
            <button
                  type='button'
                  className='black_btn'
                >
                  Sign in
                </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;