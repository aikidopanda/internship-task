import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import './style.css'


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
            <div className='container-allusers'>
                <h2>All Users</h2>
                <ol>
                    {users.map(user => (
                        <li key={user.id}>{user.email} - {user.organization}</li>
                    ))} 
                </ol>
            </div>
        </div>
    )
}

export default AllUsers