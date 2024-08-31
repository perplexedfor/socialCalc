'use client'
import { syncUser } from '@/index';
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react';
import { Button } from '@/components/button';

export default function page(){
    const { user, isLoaded } = useUser(); // Call useUser directly in the component body

    useEffect(() => {
        const fetchAndSyncUser = async () => {
            if (isLoaded && user) { 
            console.log(user);
            await syncUser(JSON.stringify(user));
        }
    };
        fetchAndSyncUser();
    }, [isLoaded, user]);
    return (<div>Hi!<Button>Create File</Button></div>)
}