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
            <div className="text-3x1 text-blue-600">Home</div>
    )
    
}
export default Home;