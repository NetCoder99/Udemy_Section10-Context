import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import {AuthContextProvider} from './store/auth-context';

function App() {
  //console.log('app:loginHandler:isLoggedIn:' + localStorage.getItem('isLoggedIn'));
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
        <MainHeader />
        <main>
          {!ctx.isLoggedIn && <Login />}
          {ctx.isLoggedIn && <Home />}
        </main>
    </React.Fragment>     
  );
}

export default App;
