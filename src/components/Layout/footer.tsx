import Link from 'next/link'
import React from 'react'

export default function Footer() {
	return (

		<footer className="bg-black text-white py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<div className="flex items-center space-x-2 mb-4">
							<div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
								<div className='p-2 px-4 rounded-xl bg-white font-bold text-xl text-black'>F</div>
							</div>
							<h4 className="text-xl font-bold">FreshCart</h4>
						</div>
						<p className="text-gray-400">Your trusted destination for the latest technology products.</p>
					</div>
					<div>
						<h5 className="font-semibold mb-4">Quick Links</h5>
						<ul className="space-y-2 text-gray-400">
							<li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Support</a></li>
							<li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
						</ul>
					</div>
					<div>
						<h5 className="font-semibold mb-4">Categories</h5>
						<ul className="space-y-2 text-gray-400">
							<li><a href="#" className="hover:text-white transition-colors">Smartphones</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Laptops</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Headphones</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
						</ul>
					</div>
					<div>
						<h5 className="font-semibold mb-4">Follow Us</h5>
						<div className="flex space-x-4">
							<Link href="#" className="text-gray-400 hover:text-white transition-colors">
								<i className="fab fa-facebook text-xl"></i>
							</Link>
							<Link href="#" className="text-gray-400 hover:text-white transition-colors">
								<i className="fab fa-twitter text-xl"></i>
							</Link>
							<Link href="#" className="text-gray-400 hover:text-white transition-colors">
								<i className="fab fa-instagram text-xl"></i>
							</Link>
						</div>
					</div>
				</div>
				<div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
					<p>&copy; 2025 FreshCart. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
