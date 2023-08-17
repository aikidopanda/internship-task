import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/mainPage'
import SignUp from './components/signup';
import SignIn from './components/signin';
import AllUsers from './components/allUsers';
import Profile from './components/profile';

function App() {
    const token = localStorage.getItem('token')

    return (
        <Router>
            <div>
                <Routes>
                    {token ? (
                        <>
                            <Route path='/' element={<Profile />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/all-users' element={<AllUsers />} />
                        </>
                    ) :
                        (
                            <>
                                <Route path='/all-users' element={<AllUsers />} />
                                <Route path='/signin' element={<SignIn />} />
                                <Route path='/signup' element={<SignUp />} />
                                <Route path='/' element={<MainPage />} />
                            </>
                        )}
                </Routes>
            </div>
        </Router>
    )
}

export default App;
