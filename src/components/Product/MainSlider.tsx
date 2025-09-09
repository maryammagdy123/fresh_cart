"use client"
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 500
	};
	return (


		<div className="w-full">


			<Slider {...settings}>
				<div>
					<Image src="/images/slider-image-1.jpeg" loader={ } width={1000} height={1000} alt="slider1" className="w-full h-96 object-cover " />
				</div>
				<div>
					<Image src="/images/slider-image-2.jpeg" width={1000} height={1000} alt="slider2" className="w-full h-96 object-cover " />
				</div>
				<div>
					<Image src="/images/slider-image-3.jpeg" width={1000} height={1000} alt="slider3" className="w-full h-96 object-cover " />
				</div>
			</Slider>
		</div>








	);
}