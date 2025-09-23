"use client"

import Link from "next/link"

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { BsCart3 } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { AiOutlineMenu } from 'react-icons/ai';
import { Button } from "../ui/button";
import { AiOutlineClose } from 'react-icons/ai';
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { cartContext } from "@/Context/CartContext";
import { Loader2, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";




export default function Navbar() {

	const { cartCount, isLoading } = useContext(cartContext)
	const links: { href: string, label: string }[] = [
		{
			href: "/products",
			label: "Products"
		},
		{
			href: "/brands",
			label: "Brands"
		},
		{
			href: "/categories",
			label: "Categories"
		},
		{
			href: "/cart",
			label: "Cart"
		},
		{
			href: "/wishlist",
			label: "Wishlist"
		},
		{
			href: "/allorders",
			label: "Orders"
		},

	]

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const pathname = usePathname()
	const { status, data } = useSession()



	return (
		<>
			<nav className="w-full border-b bg-white lg:sticky backdrop-blur-2xl top-0 left-0 z-50  shadow-sm">
				<div className="container mx-auto px-4 flex items-center justify-between h-16">
					{/* Logo */}
					<Link href="/" className="text-xl font-bold text-black p-2 px-4">
						<span className='p-2 px-4 rounded-xl mx-2 bg-black font-bold text-xl text-white'>F</span>FreshMart
					</Link>



					{/*  Desktop NavigationMenu */}
					<NavigationMenu className="hidden lg:flex z-50">
						<NavigationMenuList className="space-x-6">
							{links.map((link) => {

								const isActive = pathname.startsWith(link.href)
								return (
									<NavigationMenuItem key={link.href}>
										<NavigationMenuLink asChild>
											<Link
												key={link.href}
												href={link.href}
												className={`${isActive
													? "text-blue-600 font-semibold border-b-2 border-blue-600"
													: "text-gray-700 hover:text-blue-600"
													} transition-colors`}
											>
												{link.label}
											</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>
								)
							})}
						</NavigationMenuList>
					</NavigationMenu>

					{/* actions btns */}
					<div className="space-x-4 mx-4 flex items-center">
						{/* user icon */}
						{
							status == "loading" ? (<Loader2 className="animate-spin" />) : (
								status == "authenticated" ? (<>
									<Button variant="ghost" size="icon">
										<Link href="/register">
											<BiUser className="h-10 w-10" />
										</Link>

									</Button>
									<span className="mx-3">Hello,{data.user.name?.slice(0, 5)}</span>

									{/* shoppingCart icon */}
									<Button variant="ghost" size="icon" className="relative">
										<BsCart3 className="h-10 w-10" />

										{isLoading || cartCount > 0 ? (
											<span
												className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center justify-center min-w-[20px] min-h-[20px]"
											>
												{isLoading ? (
													<Loader2 className="animate-spin w-3 h-3" />
												) : (
													cartCount
												)}
											</span>
										) : null}
									</Button>


									{/* logout */}
									<Button variant="ghost" size="icon" className="relative" onClick={() => signOut({ callbackUrl: "/" })}>
										<LogOut className="h-10 w-10" />
									</Button>

								</>) : (

									<>
										<Link href="/auth/login">
											<span >Login</span>
										</Link>
										<Link href="/auth/register">
											<span >Register</span>
										</Link>

									</>

								))
						}
						{/* mobile menu icon toggler */}
						<Button variant="ghost" size="icon" className="lg:hidden" onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen) }}>
							{
								isMobileMenuOpen ? (<AiOutlineClose className="h-10 w-10" />) : (<AiOutlineMenu className="h-10 w-10" />)
							}
							<span className="sr-only">Menu</span>
						</Button>

					</div>
				</div >


			</nav >

			{/* Mobile NavigationMenu */}
			{isMobileMenuOpen && (
				<div className="lg:hidden border-t bg-background absolute shadow-md w-full z-[10000]">
					<div className="flex flex-col space-y-4 p-4 ">
						{links.map((link) => {
							const isActive = pathname.startsWith(link.href)
							return (
								<Link
									key={link.href}
									href={link.href}
									className={`${isActive
										? "text-blue-600 font-semibold border-b-2 border-blue-600"
										: "text-gray-700 hover:text-blue-600"
										} transition-colors text-lg`}
								>
									{link.label}
								</Link>
							)
						})}
					</div>
				</div>
			)}
		</>

	)
}
