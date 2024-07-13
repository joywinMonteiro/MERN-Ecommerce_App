// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './components/Home'
import axios from "axios"
import { UserContextProvider } from './context/UserContext'
import About from './pages/About'
import Contact from './pages/Contact'
import Category from './components/Category'
import Cart from './components/Cart'
import Payment from './components/Payment'



axios.defaults.baseURL = "http://127.0.0.1:4000/api/users";
axios.defaults.withCredentials = true;


const App = () => {
  
  return (
    <div>

    <UserContextProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/category/men" element={<Category category='men'/>} />
        <Route path="/category/women" element={<Category category="women" />} />
        <Route path="/category/kid" element={<Category category="kid" />} />
        <Route path="/myCart" element={<Cart />}/>
        <Route path="/payment" element={<Payment />}/>
      </Routes>
      <Footer />
    </Router>
    </UserContextProvider> 

    </div>
  )
}

export default App