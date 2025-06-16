"use client"
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

function Headers() {
  
    const {data:session}= useSession();

    const handleSignout= async()=>{
        try {
            await signOut()
            
        } catch (error) {
            
        }
    }

  return (
    <div></div>
  )
}

export default Headers