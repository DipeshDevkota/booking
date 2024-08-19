import {  useState,useContext } from 'react';
import { UserContext } from '../UseContext.jsx';

import Navbar from './Navbar.jsx';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

const Account = () => {
    const [redirect, setRedirect] = useState(null);
    const { setUser } = useContext(UserContext);

    async function logOut() {
        await axios.get('http://localhost:3000/api/users/logout');
        setUser(null);
        setRedirect('/');
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <>
            <div className='text-black mt-32'>
                <Navbar />
                <nav className='w-full flex mt-8 justify-center gap-5'>
                    <Link className='p-3 px-6 bg-red-500 text-white hover:bg-slate-400 rounded-full' to='/account/'>My Profile</Link>
                    <Link className='p-3 bg-red-500 text-white hover:bg-slate-400 rounded-full' to='/account/bookings'>My Bookings</Link>
                    <Link className='p-3 bg-red-500 text-white hover:bg-slate-400 rounded-full' to='/account/places'>My Accommodations</Link>
                    <button onClick={logOut} className='bg-slate-600 cursor-pointer p-3 rounded-3xl text-white shadow-sm'>LogOut</button>
                </nav>
            </div>
        </>
    );
}

export default Account;
