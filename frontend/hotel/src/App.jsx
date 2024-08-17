import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'

axios.defaults.baseURL='http://localhost:3000/'
const App = () => {
  return (
    <div>
      <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
     <Route path="/register" element={<Register/>}></Route>

   </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App