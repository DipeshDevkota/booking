import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { UserContextProvider } from './UseContext.jsx';
import Account from './pages/Account.jsx';
import Bookings from './components/Bookings.jsx';
import Accomodations from './components/Accomodations.jsx';
import NewPlaces from './components/NewPlaces.jsx';

axios.defaults.baseURL = 'http://localhost:3000/';

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Account/>}/>
          <Route path='/bookings' element={<Bookings/>}/>
          <Route path='/places' element={<Accomodations/>}/>
          <Route path='/places/new' element={<NewPlaces/>}/>


        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
