'use client'

import { useEffect } from 'react'
import { SignIn, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  useEffect(()=>{
    if(isSignedIn){
      
      router.push('/dashboard')
    }
  },[isSignedIn])
  if(isSignedIn){
    return <div>Loading...</div>
  }
  return <SignIn />
}