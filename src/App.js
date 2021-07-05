import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  console.log('app:loginHandler:isLoggedIn:' + localStorage.getItem('isLoggedIn'));

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    console.log('app:useEffect:isLoggedIn:' + localStorage.getItem('isLoggedIn'));
    const isLoggedInStorage = localStorage.getItem('isLoggedIn');
    if (isLoggedInStorage === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    console.log('app:loginHandler:' + email);
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    console.log('app:logoutHandler:');
    localStorage.setItem('isLoggedIn', '0');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
