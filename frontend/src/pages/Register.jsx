import React, { useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register =() =>{
    const [values, setValues] = useState({
        username:'',
        email:'',
        password:'',
    })
    const navigate = useNavigate()
    const handleChanges = (e) =>{
        setValues({...values, [e.target.name]: e.target.value})
    }
    const handleSumit = async (e) =>{
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:2600/auth/register', values)
            if( response.status === 201){
                navigate('/login');
            }
        } catch(err){
            if (err.response?.status === 409) {
                alert("User already exists. Try logging in.");
            } else {
                    alert("Registration failed. Please try again.");
                }
            console.log(err)
        }
    }
    return(
       <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <div className="bg-white px-8 py-6 rounded-lg shadow-md w-full max-w-md">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

    <form onSubmit={handleSumit}>
      <div className="mb-5">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          name="username"
          onChange={handleChanges}
          placeholder="Username"
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChanges}
          placeholder="you@example.com"
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChanges}
          placeholder="Choose a secure password"
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
      >
        Register
      </button>
    </form>

    <p className="text-center text-sm text-gray-600 mt-4">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-600 hover:underline font-medium">
        Login
      </Link>
    </p>
  </div>
</div>
    )
}

export default Register