import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users/profile', { withCredentials: true })
      .then(response => setUser(response.data))
      .catch(error => console.error('Failed to fetch user profile', error));
  }, []);
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
