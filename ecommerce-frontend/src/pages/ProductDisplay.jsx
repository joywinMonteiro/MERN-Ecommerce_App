// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import banner_men from "/images/banner_mens.png";
import banner_kids from "/images/banner_kids.png";
import banner_women from "/images/banner_women.png";
import slide_arrow from "/images/breadcrum_arrow.png";

const ProductDisplay = () => {


    const banners = [
        {imageUrl: banner_women},
        {imageUrl: banner_men},
        {imageUrl: banner_kids},
    ]

    const [currentBanner, setCurrentBanner] = useState(0)
    const [products, setProducts] = useState([])

    const nextSlide = () =>{
        setCurrentBanner((currentBanner + 1) % banners.length)
    }

    const prevSlide = () =>{
        setCurrentBanner((currentBanner - 1 + banners.length) % banners.length);
    }

    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await axios.get("/products")
            setProducts(response.data)
        } catch (error) {
            console.error("Error: ", error);
        }
        }       
        fetchProducts() 
    }, [])
    


  return (
    <div>
        <div className="relative">
        <div className="slider-wrapper flex">
        
        <img src={banners[currentBanner].imageUrl} alt="" />
        
        <img
          src={slide_arrow}
          alt="Next Slide"
          className="p-2 cursor-pointer rounded-xl bg-gray-300 absolute top-[50%] -translate-y-1/2 right-5"
          onClick={nextSlide}
        />

        <img
          src={slide_arrow}
          alt="Previous Slide"
          className="p-2 cursor-pointer rounded-xl bg-gray-300 absolute top-[50%] -translate-y-1/2 left-5 transform rotate-180"
          onClick={prevSlide}
        />

        </div>
        </div>
        
        <div className='grid grid-cols-4 gap-6'>
        {/* <h1>Product List</h1> */}
            {
                products.map(item => (
                    <div key={item._id}>
                        <h1 className='text-3xl font-medium'>{item.name}</h1>
                        <p className='text-sm text-gray-400 font-medium'>Category: {item.category}</p>
                        <img src={item.image} alt="" className='w-32 h-32'/>
                        {/* <img src={`http://localhost:3000/api/users${item.image}`} alt="" /> */}
                        <p className='line-through text-xl text-gray-500'>$ {item.old_price}</p>
                        <p className='text-2xl text-gray-600 font-semibold'>$ {item.new_price}</p>
                    </div>
                ))
            }
    </div>
    </div>
    
  )
}

export default ProductDisplay