import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

function SignUp(){
    const [email, setEmail] = useState("");  // Changed from username to email
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")

    const handleSignUp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/signup", { email, password });  // Modified here
            if (response.data.message === "User already exists" || response.data.message === "Invalid email"){
                setMessage(response.data.message)
            }
            else{
                window.location.replace('/signin')
            }           
        } catch (error) {
            console.error("Error signing up:", error);
        }
    }

    return(
        <div>
            <div className='container-main'>
                <p>Enter your email and password and press 'Sign up' to create a new user</p>
                <p><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /> </p> 
                <p><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></p>
                <button onClick={handleSignUp}>Sign Up</button>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default SignUp