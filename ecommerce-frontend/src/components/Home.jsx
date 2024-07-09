// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react'
import banner2 from "/images/banner_mens.png"
import banner1 from "/images/img1.webp"
import banner3 from "/images/img5.webp"
import banner4 from "/images/img4.jpg"
import arrow_image from "/images/breadcrum_arrow.png"
import { Link } from 'react-router-dom'
import Product from './Product'

const Home = () => {
  const banners = [
    { imageUrl: banner1 },
    { imageUrl: banner2 },
    { imageUrl: banner3 },
    { imageUrl: banner4 },
  ];


  const [currentBanner, setCurrentBanner] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentBanner((currentBanner + 1) % banners.length);
  }, [currentBanner, banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentBanner((currentBanner - 1 + banners.length) % banners.length);
  }, [currentBanner, banners.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); 
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className='min-h-screen mt-[10px]'>
      <div className="flex relative">
        <Link to="/category/men">
          <img src={banners[currentBanner].imageUrl} alt="" className='w-screen h-[400px]' />
        </Link>

        <img
          src={arrow_image}
          alt="Next Slide"
          className="p-2 cursor-pointer rounded-xl bg-gray-300 absolute top-[50%] right-5"
          onClick={nextSlide}
        />

        <img
          src={arrow_image}
          alt="Previous Slide"
          className="p-2 cursor-pointer rounded-xl bg-gray-300 absolute top-[50%] left-5 transform rotate-180"
          onClick={prevSlide}
        />
      </div>
      <div>
        <Product category='all'/>
      </div>
    </div>
  );
};

export default Home;