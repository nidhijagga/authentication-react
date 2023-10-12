import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Store/AuthContext';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const Authctx = useContext(AuthContext)

  const isLoggedIn=Authctx.isLoggedIn
  console.log(isLoggedIn)

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn&&  <li>
            <Link to='/auth'>Login</Link>
          </li>}
         
          {isLoggedIn&&<li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggedIn&&<li>
            <button>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;