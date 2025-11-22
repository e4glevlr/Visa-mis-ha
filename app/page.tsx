import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Clock, Globe } from "lucide-react"
import { WhatsAppButton } from "@/components/WhatsAppButton"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center mx-auto max-w-screen-2xl">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold inline-block">Passport Service</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center">
              <Link href="/apply">
                <Button>Apply Now</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Fast & Secure Passport Services
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Apply for your passport renewal or new application in minutes. We handle the paperwork so you don&apos;t have to.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href="/apply">
                <Button size="lg" className="w-full sm:w-auto">Start Application</Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">Learn More</Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 mx-auto">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Why Choose Us?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              We prioritize security, speed, and ease of use.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <ShieldCheck className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Secure Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Your data is encrypted and stored securely. We strictly follow privacy regulations.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Clock className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Fast Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    We optimize the process to ensure your application is submitted correctly the first time.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Globe className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Global Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Whether you are in Vietnam or abroad, we can assist you with your passport needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto max-w-screen-2xl">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Antigravity.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
