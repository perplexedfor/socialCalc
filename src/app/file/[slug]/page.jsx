import prisma from '@/db';
import PageTable from '@/components/table'


export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())
 
  // return posts.map((post) => ({
  //   slug: post.slug,
  // }))
}

// Give our default column cell renderer editing superpowers!
export default function Page(){
  return(
    <PageTable></PageTable>
  )
}