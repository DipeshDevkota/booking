import  { useContext, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import {Link, Navigate} from 'react-router-dom'
import { UserContext } from '../UseContext'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect]= useState(false);
  const {setUser}=useContext(UserContext);

const  submitHandler=async(e)=>{
    e.preventDefault();
   try {
    const response= await axios.post('http://localhost:3000/api/users/login',{
     email,
     password
    },
  {withCredentials:true});
  setUser(response.data)
    alert('Login successfull')
    setRedirect(true);
   } catch (error) {


    console.log("Login Unsuccessfull",error);
    alert('Login failed. Please try again later')


    
   }

  }

  if(redirect)
  {
    return <Navigate to={'/'}/>
  }

 
  
  return (
    <div>

        <Navbar/>


        <div className='mt-4 grow  justify-center items-center  '>
            <h1 className='text-4xl text-center '>LogIn</h1>
            <form onSubmit={submitHandler} className=' max-w-md mx-auto border flex flex-col gap-2 p-2 mt-3 '>
               
               <input type='email' placeholder='your@gmail.com' className='p-4 rounded-3xl' 
               value={email}
               onChange={(e)=>setEmail(e.target.value)}/>
               <input type='password' placeholder='password' className='p-4 rounded-3xl'
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
               
               />
               <button className='btn bg-red-400 cursor-pointer p-4 rounded-3xl text-white text-xl'>LogIn</button>
              <div className='text-center  py-2 text-gray-500'>
                Dont`t have an account yet?
                <Link className='underline text-black'to ={'/register'}>Register now</Link>
              </div>

            </form>
        </div>
    </div>
  )
}

export default Login