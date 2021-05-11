import React from 'react';
import './App.css';
import { useAuth } from 'context/auth-context';
import UnauthenticatedApp from 'unauthenticated-app/index';
import AuthenticatedApp from './authenticated-app';
import ErrorBoundary from 'components/error-boundary';
import { ErrorPage } from 'components/flexLib';
function App() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="App">
       {/* 使用错误边界 */}
       <ErrorBoundary fallbackRender={ErrorPage}>
          {
            user ? <AuthenticatedApp /> : <UnauthenticatedApp/>
          }
       </ErrorBoundary>
    </div>
  );
}

export default App;
