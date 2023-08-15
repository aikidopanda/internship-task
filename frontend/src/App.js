import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './mainPage'

function App() {
    const token = localStorage.getItem('token')

    return(
        <Router>
            <div>
                <Routes>
                    {token ? (
                        <>
                            <Route path='/' element={<Profile/>}/>
                            <Route path='/profile' element={<Profile/>}/>
                            <Route path='/all-users' element={<AllUsers/>}/>
                        </>
                    ) : 
                    (
                        <>
                            <Route path='/all-users' element={<AllUsers/>}/>
                            <Route path='/signin' element={<SignIn/>}/>
                            <Route path='/signup' element={<SignUp/>}/>
                            <Route path='/' element={<MainPage/>}/>        
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    )
}

function AllUsers(){
    const [users, setUsers] = useState([])

    useEffect(
        () => {
            axios.get('http://localhost:5000/all-users')
            .then(response => {
                setUsers(response.data.users)
            })
            .catch(error => {
                console.error(error)
            })
        },
    [])

    return(
        <div>
            <h2>All Users</h2>
            <ol>
                {users.map(user => (
                    <li key={user.id}>{user.email} - {user.organization}</li>
                ))} 
            </ol>
        </div>
    )
}

function SignIn(){
    const [email, setEmail] = useState("");  // Changed from username to email
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        try {
            const response = await axios.post("http://localhost:5000/signin", { email, password });  // Modified here
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            window.location.replace('/profile')
        } catch (error) {
            console.error("Error signing in:", error);
        }
    }

    return(
        <div>
            <p>Enter your email and password</p>
            <p><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /> </p> 
            <p><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></p>
            <button onClick={handleSignIn}>Sign In</button> 
        </div>
    )
}

function SignUp(){
    const [email, setEmail] = useState("");  // Changed from username to email
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            await axios.post("http://localhost:5000/signup", { email, password });  // Modified here
            window.location.replace('/signin')
            
        } catch (error) {
            console.error("Error signing up:", error);
        }
    }

    return(
        <div>
            <p>Enter your email and password and press 'Sign up' to create a new user</p>
            <p><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /> </p> 
            <p><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /></p>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}

function Profile(){
    const [userToOrg, setUserToOrg] = useState("")
    const [organization, setOrganization] = useState("")

    const handleOrgAdd = async () => {
        const token = localStorage.getItem('token')
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

    return(
        <div>
            <p>Add your organization to a list. Note: if you already have an organization, it will change to new one</p>
            <input type='text' value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder='Enter organization name'/>
            <button onClick={handleOrgAdd}>Add new organization</button><br></br>
            <p>Add a user to your organization</p>
            <input type="text" value = {userToOrg} onChange={(e) => setUserToOrg(e.target.value)} placeholder='Type the user email'/>
            <button onClick={userToOrgFunc}>Add user</button><br></br>
            <p><button onClick={() => { localStorage.removeItem('token'); window.location.replace('/'); }}>Log out</button></p>
        </div>
    )
}

export default App;
