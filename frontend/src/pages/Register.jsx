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
            console.log(err)
        }
    }
    return(
        <div className="flex justify-center items-center h-screen">
            <div className="shadow-lg px-8 py-5 border rounded-sm w-96">
                <h2 className="text-lg font-bold mb-4 text-9xl">Registraction</h2>
                <form onSubmit={handleSumit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 mb-1">UserName</label>
                        <input type='text' placeholder="Enter Username" className="w-full px-3 py-2 border rounded-sm" name="username" onChange={handleChanges}></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                        <input type='email' placeholder="Enter Email" className="w-full px-3 py-2 border rounded-sm" name="email" onChange={handleChanges}></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
                        <input type="password" placeholder="Enter Password" className="w-full px-3 py-2 border rounded-sm" name="password" onChange={handleChanges}></input>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-2"> Submit</button>
                </form>
                <div className="text-center">
                    <span>Already have account?</span>
                    <Link to='/login' className="text-blue-500">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register