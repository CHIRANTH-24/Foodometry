"use client"
import RecipeList from '@/components/RecipeList';
import { UserButton, useUser } from '@clerk/clerk-react';
import React from 'react'

const page = () => {
  const { user } = useUser();
  return (
    <div className=''>
      <h1> 
        {user?.firstName
          ? `Hi, ${user.firstName}!`
          : "Hi! "}
      </h1>
      <h2 className='text-sm'>Ready to achieve your goals today?</h2>
      <div>
        <RecipeList/>
      </div>
    </div>
  )
}

export default page
