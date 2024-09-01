
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-8 shadow-sm">
        <div className="container flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2 animate-fade-in-up px-8" prefetch={false}>
            {/* <MountainIcon className="h-6 w-6" /> */}
            <span className="text-lg font-semibold">SocialCalc</span>
          </Link>
          <Button className="ml-auto px-6 py-3 rounded-md bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors animate-fade-in-up delay-100">
            Try Sheets for work
          </Button><Button className=" px-6 mx-8 py-3 rounded-md bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors animate-fade-in-up delay-100">
            <Link href='\sign-in'>Sign in</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-16 md:py-20 lg:py-35">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 animate-fade-in-up px-8">
              <h1 className="text-4xl font-bold tracking-tight animate-fade-in-up delay-100">
                Unlock the Power of
                <span style={{ padding: "0px", margin: "0px" }} className="cssanimation open"> Spreadsheets </span>
              </h1>
              <p className="text-muted-foreground text-lg animate-fade-in-up delay-200">
                Our intuitive spreadsheet tool makes data analysis a breeze. Collaborate with your team, automate
                workflows, and unlock insights with ease.
              </p>
              <div className="flex gap-4 animate-fade-in-up delay-300">
                <Button
                  variant="outline"
                  className="px-6 py-3 rounded-md text-primary hover:bg-primary/10 transition-colors"
                >
                  <Link href='\sign-up'>Get Started</Link>
                </Button>
              </div>
            </div>
            <div className="animate-fade-in-up delay-400">
              <img
                src="https://media.istockphoto.com/id/1435456390/vector/spreadsheet-illustration-concept-business-analysis-and-analytical-database-report-financial.jpg?s=612x612&w=0&k=20&c=RsvNAaKqSYLcsmHM1P74OmMPb3Jj2QkKnMDXz92ata8="
                width="700"
                height="400"
                alt="Spreadsheet"
                className="rounded-lg shadow-lg"
                style={{ aspectRatio: "700/400", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
        <section className="bg-muted py-16 md:py-28 lg:py-36">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 animate-fade-in-up delay-100">
              <img
                src="https://media.istockphoto.com/id/1262600344/vector/symbol-of-teamwork-cooperation-partnership.jpg?s=612x612&w=0&k=20&c=uE7y0XBX3rPtxUE6b7RxXcKHJvG_3bBhpb28B0ky-S8="
                width="700"
                height="400"
                alt="Collaboration"
                className="rounded-lg shadow-lg"
                style={{ aspectRatio: "700/400", objectFit: "cover" }}
              />
            </div>
            <div className="space-y-4 animate-fade-in-up px-8">
              <h2 className="text-3xl font-bold tracking-tight animate-fade-in-up delay-200">
                Collaborate with Your Team
              </h2>
              <p className="text-muted-foreground text-lg animate-fade-in-up delay-300">
                Share your spreadsheets, assign tasks, and track progress seamlessly. Our real-time collaboration
                features keep your team in sync.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-primary text-primary-foreground py-8 shadow-sm">
        <div className="px-8 container flex items-center justify-between">
          <p className="text-sm animate-fade-in-up">&copy; 2024 SocialCalc</p>
          <nav className="flex items-center gap-4 animate-fade-in-up delay-100">
          <Link href="#" className="text-sm hover:underline underline-offset-4 transition-colors" prefetch={false}>
              About
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4 transition-colors" prefetch={false}>
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4 transition-colors" prefetch={false}>
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4 transition-colors" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}