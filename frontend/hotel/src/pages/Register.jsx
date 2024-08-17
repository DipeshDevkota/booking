import { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Register = () => {

    const registerUser= async(e)=>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/users/register', {
                name,
                email,
                password
            });
            alert('Registration successful. Now you can login');
        } catch (error) {
            console.error("Registration failed:", error);
            alert('Registration failed. Please try again later');
        }
        
    }


    const [name,setName] = useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('')
  return (
    <div>

        <Navbar/>


        <div className='mt-4 grow  justify-center items-center  '>
            <h1 className='text-4xl text-center '>Register</h1>
            <form onSubmit={registerUser} className=' max-w-md mx-auto border flex flex-col gap-2 p-2 mt-3  '>
               <input type='text' placeholder='John Doe' className='p-4 rounded-3xl ' 
               value={name}
               onChange={(e)=>setName(e.target.value)}/>
               <input type='email' placeholder='your@gmail.com' className='p-4 rounded-3xl' 
               value={email}
               onChange={(e)=>setEmail(e.target.value)}/>
               <input type='password' placeholder='password' className='p-4 rounded-3xl'
               value={password}
               onChange={(e)=>setPassword(e.target.value)}/>
               <button className='btn bg-red-400 cursor-pointer p-4 rounded-3xl text-white text-xl'>Register</button>
              <div className='text-center  py-2 text-gray-500'>
               Already member?
                <Link className='underline text-black'to ={'/register'}>Login</Link>
              </div>

            </form>
        </div>
    </div>
  )
}

export default Register