'use client'

import { useEffect } from 'react'
import { SignUp, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn])

  if (isSignedIn) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp className="relative" />
    </div>
  )
}