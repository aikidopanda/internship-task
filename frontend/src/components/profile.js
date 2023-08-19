import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './style.css'

function Profile(){
    const [userToOrg, setUserToOrg] = useState("")
    const [organization, setOrganization] = useState("")
    const [message, setMessage] = useState("")

    const handleOrgAdd = async () => {
        const token = localStorage.getItem('token')
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        try{
            const response = await axios.post("http://localhost:5000/create-org", { organization }, {headers})
            setMessage(response.data.message)
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
            const response = await axios.post("http://localhost:5000/add-to-org", { userToOrg }, {headers})
            setMessage(response.data.message)
        }
        catch(error){
            console.error("Error during adding a user to organization", error)
        }
    }

    return(
        <div>
            <div className='container-profile'>
                <p>Add your organization to a list. Note: if you already have an organization, it will change to new one</p>
                <input type='text' value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder='Enter organization name'/>
                <button onClick={handleOrgAdd}>Add new organization</button><br></br>
                <p>Add a user to your organization. If this user already has an organization, it will change to new one.</p>
                <input type="text" value = {userToOrg} onChange={(e) => setUserToOrg(e.target.value)} placeholder='Type the user email'/>
                <button onClick={userToOrgFunc}>Add user</button><br></br>
                List of all users:
                <Link to='../all-users'>
                    <button>All users</button>
                </Link>
                <p><button onClick={() => { localStorage.removeItem('token'); window.location.replace('/'); }}>Log out</button></p>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Profile