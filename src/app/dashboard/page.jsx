'use client'
import { useAuth,useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react';
import Files from '@/components/dashboard/files';
import { createFile } from '@/index';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { syncUser } from '@/index';
import { SignOutButton } from '@clerk/nextjs'
import { supabase } from '@/supabase/index.js';

export default function page(){
    const { user, isLoaded } = useUser();
    const [posts, setPosts] = useState([]);
    console.log(user);
    const { userId } = useAuth(); 
    console.log(userId);// Call useUser directly in the component body
    useEffect(() => {
        const fetchAndSyncUser = async () => {
            if (isLoaded && userId) { 
            console.log(user);
            await syncUser(JSON.stringify(user));
        }
      };
      fetchAndSyncUser();
    }, [user]);
    useEffect(() => {
        const fetchPosts = async () => {
          if(!userId) return
        const transformedId = userId.substring(5);
        const { data, error } = await supabase
          .from('Text')
          .select('*')
          .eq('authorId', transformedId);
        if (error) {
          setError(error);
          console.error('Error fetching posts:', error);
        } else {
          setPosts(data);
        }
        console.log(data);
      };
      fetchPosts();
    }, [userId]);
    const router = useRouter();
    const check = async (userId) => {
        const file = await createFile(userId)
        if(file)
            router.push(`/file/${file.id}`)
        else
            console.log('Error creating file')
    }

    return (<div className="flex flex-col min-h-screen bg-muted/40">
        <header className="sticky top-0 z-30 flex items-center h-16 px-4 border-b bg-background sm:px-6">
          <div className="flex items-center gap-4">
            <Button size="sm" className="hidden sm:inline-flex" onClick={()=>check(userId)}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Create New File
            </Button>
            <div className="relative flex-1 hidden sm:flex">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input type="search" placeholder="Search files..." className="w-full pl-10 rounded-md bg-muted" />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="ml-auto">
                <img
                  src="/placeholder.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="rounded-full"
                  style={{ aspectRatio: "36/36", objectFit: "cover" }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><SignOutButton>LogOut</SignOutButton></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <Files props={posts} />
        
      </div>)
}

function DownloadIcon() {
  return (
    <svg

      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


function MoveVerticalIcon() {
  return (
    <svg

      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}