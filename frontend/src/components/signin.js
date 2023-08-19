import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

function SignIn(){
    const [email, setEmail] = useState("");  // Changed from username to email
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")

    const handleSignIn = async () => {
        try {
            const response = await axios.post("http://localhost:5000/signin", { email, password });
            console.log(response.data.message)
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            window.location.replace('/profile')
        } catch (error) {
            console.error("Error signing in:", error);
            if (error.response && error.response.status === 401){
                setMessage(error.response.data.message)
            }
            else{
                setMessage('Unknown error. Please try again later')
            }
        }
    }

    return(
        <div>
            <div className='container-main'>
                <p>Enter your email and password</p>
                <p><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /> </p> 
                <p><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></p>
                <button onClick={handleSignIn}>Sign In</button>
                <p>{message}</p> 
            </div>
        </div>
    )
}

export default SignIn