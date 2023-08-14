import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [email, setEmail] = useState("");  // Changed from username to email
    const [password, setPassword] = useState("");
    const [organization, setOrganization] = useState("")
    const [userToOrg, setUserToOrg] = useState("")

    const handleSignUp = async () => {
        try {
            await axios.post("http://localhost:5000/signup", { email, password });  // Modified here
        } catch (error) {
            console.error("Error signing up:", error);
        }
    }

    const handleSignIn = async () => {
        try {
            const response = await axios.post("http://localhost:5000/signin", { email, password });  // Modified here
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            window.location.reload()
        } catch (error) {
            console.error("Error signing in:", error);
        }
    }

    const handleOrgAdd = async () => {
        const token = localStorage.getItem('token')
        console.log(token)
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        try{
            await axios.post("http://localhost:5000/create-org", { organization }, {headers})
        }
        catch(error){
            console.error("Error during creating an organization", error)
        }
    }

    const userToOrgFunc = async () => {
        const token = localStorage.getItem('token')
        console.log(token)
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        try{
            await axios.post("http://localhost:5000/add-to-org", { userToOrg }, {headers})
        }
        catch(error){
            console.error("Error during adding a user to organization", error)
        }
    }

    if (localStorage.getItem('token')){
        return(
            <div>
                <p>Add your organization to a list. Note: if you already have an organization, it will change to new one</p>
                <input type='text' value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder='Enter organization name'/>
                <button onClick={handleOrgAdd}>Add new organization</button><br></br>
                <p>Add a user to your organization</p>
                <input type="text" value = {userToOrg} onChange={(e) => setUserToOrg(e.target.value)} placeholder='Type the user email'/>
                <button onClick={userToOrgFunc}>Add user</button><br></br>
                <p><button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>Log out</button></p>
            </div>
        )
    }
    else{
        return (
            <div>
                <p>Enter your email and password and hit either 'Sign up' to create a new user or 'Sign in' to enter the existing account</p>
                <p><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /> </p> 
                <p><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></p>            
                <button onClick={handleSignUp}>Sign Up</button>
                <button onClick={handleSignIn}>Sign In</button>
            </div>
        );
    }
}

export default App;
