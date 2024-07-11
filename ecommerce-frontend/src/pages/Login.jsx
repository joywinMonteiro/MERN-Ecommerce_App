// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { UserContext } from '../context/UserContext.jsx'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

    async function handleSubmit (e) {
        e.preventDefault()      
        try {
            const {data} = await axios.post('/login', {email, password})
            setUser(data)
            alert("Login Successful")
            navigate("/")
        } 
        catch (error) {
            alert("Login failed!!")
        }   
    }

    useEffect(() => {

    })

  return (
    <div className='mt-32 min-h-screen'>
        <form onSubmit={handleSubmit}>
        <h1 className='text-center mb-16 text-4xl font-bold text-orange-800'>Login</h1>
        <div className='flex flex-col gap-4 mt-4  justify-center items-center'>
        <input 
            type="email" className="w-96 border-2 rounded-xl p-2" 
            placeholder='yourEmail@gmail.com' 
            value={email} 
            onChange={e => setEmail(e.target.value)}
        />
        
        
        <input 
            type="password" className="w-96 border-2 rounded-xl p-2" 
            placeholder='password' 
            value={password} 
            onChange={e => setPassword(e.target.value)}
        />


        <button className='text-xl border-2 h-14 hover:scale-105 w-96 rounded-xl bg-red-400 text-white p-2 font-semibold'>
            Login
        </button>
        <p className= 'text-gray-500'>Don&apos;t have an account yet? 
            <Link to="/register" className='text-gray-800 underline'>Register here</Link>
        </p>
        </div> 
        </form>
    </div>
  )
}

export default Login