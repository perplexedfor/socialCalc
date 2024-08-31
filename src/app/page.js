import { auth, currentUser } from '@clerk/nextjs/server'
import { Button } from "@/components/button"

import  Link  from 'next/link'
export async function Page() {
  const userInfo = auth()

  if (userInfo) {
    console.log(userInfo)
  }


  const user = await currentUser()
  if (user) {
    console.log(user)
  }
}

export default function Home() {
  Page();
  return (
    <div><Button href='\sign-in'><Link href='\sign-in'>Sign in</Link></Button></div>
  );
}
