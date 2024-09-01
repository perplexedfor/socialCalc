import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Files(props) {
    const  posts  = props.props;
    console.log(posts);
    // Add userId to the dependency array
    // console.log(props);
  return (
    <div>
        <main className="flex-1 p-4 sm:p-6 ">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {posts.map(post => (
            <Link href={`/file/${post.id}`} key={post.id}>
        <Card key={post.id} className="transition-transform duration-200 hover:scale-105">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="font-medium">Created At {post.created_at.toString().substr(0,10) || 'Untitled'}</div>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">{post.data ? post.data.length+" Rows" : " 0 Rows"}</div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <DownloadIcon className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost">
                {/* <MoveVerticalIcon className="w-5 h-5" /> */}
              </Button>
            </div>
          </CardContent>
        </Card>
        </Link>
      ))}
      </div>
        </main>
      
    </div>
  );
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