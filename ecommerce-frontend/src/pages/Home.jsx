// eslint-disable-next-line no-unused-vars
import React from 'react'
import banner_men from "../../public/images/banner_mens.png"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div> 
        <Link to="/product"><img src={banner_men} alt="" /></Link>
    </div>
  )
}

export default Home