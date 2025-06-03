import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, {useEffect } from "react";

const Home =()=>{
const navigate = useNavigate()

useEffect(()=>{
    const fetchUser = async () => {
    try{
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/login')
        }
        const response =await axios.get('http://localhost:2600/auth/home',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
       if(!response.data || !response.data.user){
        navigate('/login')
       }
    } catch(err){
        console.error("Error fetching user:", err);
        navigate('/login')
    }
}
    fetchUser()
},[navigate])

    return(
             <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome</h1>
        <p className="text-gray-600 mt-2">You're successfully logged in.</p>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
    );
    
};
export default Home;