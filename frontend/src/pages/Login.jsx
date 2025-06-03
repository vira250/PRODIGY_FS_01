import React, { useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login =() =>{
    const [values, setValues] = useState({
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
            const response = await axios.post('http://localhost:2600/auth/login', values)
            if( response.status === 200){
                localStorage.setItem('token', response.data.token)
                navigate('/home');
            }
        } catch(err){
            if (err.response?.status === 401) {
        alert("Invalid credentials");
      } else {
        console.error(err);
        alert("Login failed");
      }
        }
    }
    return(
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-5 text-gray-800">Login</h2>

        <form onSubmit={handleSumit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChanges}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChanges}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-150"
          >
            Submit
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
    )
}

export default Login