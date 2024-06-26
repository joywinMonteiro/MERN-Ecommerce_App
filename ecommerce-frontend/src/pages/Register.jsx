// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [username, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit (e){
        e.preventDefault()
        try {
            await axios.post('/register', {username, email, password})
            alert("Registration successful. Log in now!!")
            navigate('/login')
        } catch (error) {
            alert("Registration failed!! Please try again later.. ")
        }
    }

  return (
    <div className='mt-32 min-h-screen'>
        <form onSubmit={handleSubmit}>
        <h1 className='text-center mb-16 text-4xl font-bold text-orange-800'>Register</h1>
        <div className='flex flex-col gap-4 mt-4  justify-center items-center'>
        <input 
            type="text" placeholder="Username" 
            className="w-96 border-2 rounded-xl p-2" 
            value={username}
            onChange={e => setName(e.target.value)}
        />
         
        <input 
            type="email" className="w-96 border-2 rounded-xl p-2"
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
        />

        <input 
            type="password" className="w-96 border-2 rounded-xl p-2" 
            placeholder='Password' 
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        
        <button 
            type='submit' 
            className='text-xl border-2 h-14 hover:scale-105 w-96 rounded-xl bg-red-400 text-white p-2 font-semibold' 
        >Register
        </button>
        <p className= 'text-gray-500'>Already have an account? 
            <Link to="/login" className='text-gray-800 underline'>Login here</Link></p>
        </div>
        </form>
    </div>
  )
}

export default Register