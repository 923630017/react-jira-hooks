import React from 'react';
import './App.css';
import { useAuth } from 'context/auth-context';
import UnauthenticatedApp from 'unauthenticated-app/index';
import AuthenticatedApp from './authenticated-app';

function App() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="App">
        {
          user ? <AuthenticatedApp /> : <UnauthenticatedApp/>
        }
    </div>
  );
}

export default App;
