
import PageTable from '@/components/table';
import { supabase } from '@/supabase/index.js';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    // Fetching data from the 'Text' table
    const { data: posts, error } = await supabase
      .from('Text')
      .select('id');

    if (error) {
      console.error('Error fetching posts:', error);
      return []; // Return an empty array in case of an error
    }

    console.log(posts);

    return posts.map((post) => ({
      params: {
        slug: post.id.toString(), // Convert to string if necessary
      },
    }));
  } catch (error) {
    console.error('Unexpected error:', error);
    return []; // Return an empty array in case of an error
  }
}

export default function Page({ params }) {
  console.log(params);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className=" w-full p-6 bg-white shadow-md rounded-lg">
        <div className="mb-6 text-center">
          <Link href='/dashboard'>
            <Button className="mb-4">To Dashboard</Button>
          </Link>
          
          <h1 className="text-2xl font-semibold mb-4">File Page</h1>
        </div>
        <PageTable id={params.slug} />
      </div>
    </div>
  );
}