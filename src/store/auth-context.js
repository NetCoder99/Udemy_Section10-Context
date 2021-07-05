import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      console.log('AuthContextProvider:useEffect:isLoggedIn:' + localStorage.getItem('isLoggedIn'));
      const isLoggedInStorage = localStorage.getItem('isLoggedIn');
      if (isLoggedInStorage === '1') {
        setIsLoggedIn(true);
      }
    }, []);
  
    const loginHandler = (email, password) => {
      console.log('AuthContextProvider:loginHandler:email:' + email);
      localStorage.setItem('isLoggedIn', '1');
      setIsLoggedIn(true);
    };
  
    const logoutHandler = () => {
      console.log('AuthContextProvider:logoutHandler:');
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    };

    return (
    <AuthContext.Provider 
        value={{
            isLoggedIn: isLoggedIn, 
            onLogout: logoutHandler, 
            onLogin: loginHandler}}
        >
        {props.children}</AuthContext.Provider>
    )
}

export default AuthContext;