
import { Button } from "@/components/ui/button"
import Link from "next/link";
export default function Home() {
  const btns = [
    {
      href: "/products",
      label: "Shop Now",
      variant: "default" as const,
    },
    {
      href: "/Categories",
      label: "Browse Categories",
      variant: "outline" as const,
    },
  ]


  return (
    <section className='LandingPage container mx-auto px-4 py-40'>
      <div className='text-center space-y-6'>
        <h1 className='text-4xl font-bold tracking-tight lg:text-6xl'>Welcome to FreshMart</h1>
        <p className='text-gray-400 max-w-2xl mx-auto text-xl'>
          Discover the latest technology , fashion and lifestyle products.Quality<br />
          guranted with fast shipping and exellent customer services
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center ">
          {btns.map((btn) => {
            const { href, label, variant } = btn;
            return <Button size="lg" variant={variant} className="text-lg px-8" key={href}>
              <Link href={href}>{label}</Link>
            </Button>
          })}
        </div>
      </div>
    </section>
  );
}
