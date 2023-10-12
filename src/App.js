import { useContext } from 'react';
import { Switch, Route,Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './Store/AuthContext';

function App() {
  const authCtx = useContext(AuthContext)
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn &&<Route path='/auth'>
          <AuthPage />
        </Route>}
         <Route path='/profile'>
          {authCtx.isLoggedIn &&<UserProfile />}
          {!authCtx.isLoggedIn&&<AuthPage/>}
        </Route>

        {/* if above three of them will not execute then this one will execute */}
        <Route path='*'>
          <Redirect to ='/' /> 
        </Route>
      
      
      </Switch>
    </Layout>
  );
}

export default App;