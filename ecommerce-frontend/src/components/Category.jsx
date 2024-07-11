// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react'
import banner_men from "/images/banner_mens.png";
import banner_kids from "/images/banner_kids.png";
import banner_women from "/images/banner_women.png";
import slide_arrow from "/images/breadcrum_arrow.png";
import { Link } from 'react-router-dom'
// import ProductDisplay from './ProductDisplay';
import Product from './Product';

// eslint-disable-next-line react/prop-types
const Category = ({category}) => {
    
    const banners = [
        {imageUrl: banner_women},
        {imageUrl: banner_men},
        {imageUrl: banner_kids},
    ]

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
    }, 4000); 
    return () => clearInterval(interval);
  }, [nextSlide]);


  return (
    <div className="min-h-screen  mt-[10px]">
      <div className="flex relative">
        <Link to="/category/men">
          <img src={banners[currentBanner].imageUrl} alt="" className="w-screen h-[400px]" />
        </Link>

        <img
          src={slide_arrow}
          alt="Next Slide"
          className="p-2 cursor-pointer rounded-xl bg-gray-300 absolute top-[50%] right-5"
          onClick={nextSlide}
        />

        <img
          src={slide_arrow}
          alt="Previous Slide"
          className="p-2 cursor-pointer rounded-xl bg-gray-300 absolute top-[50%] left-5 transform rotate-180"
          onClick={prevSlide}
        />
      </div>
      <div>
        <Product category={category} />
      </div>
    </div>
  );
};

export default Category;