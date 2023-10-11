import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputref = useRef()
  const posswardInputref = useRef()


  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setisLoading]=useState(false)
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submithandler = (event)=>{
    event.preventDefault()

    const EnteredEmail = emailInputref.current.value
    const EnteredPossward = posswardInputref.current.value
    setisLoading(true)
    if (isLogin) {
     
    } else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDIuqYiLD1xgngovAbWDHA3dE24mjdhKjs',{
        method:'POST',
        body:JSON.stringify({
          email:EnteredEmail,
          password:EnteredPossward,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response=>{
        setisLoading(false)
        if(response.ok){
          //...
        }else{
          return response.json().then(data=>{
            let errorMessage = 'Authentication failed'
            if(data&&data.error&&data.error.message){
              errorMessage = data.error.message 
            }
            alert(errorMessage)

            console.log(data)
          })
        }
      })
      
    }
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form  onSubmit={submithandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref = {emailInputref}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={posswardInputref}
          />
        </div>
        <div className={classes.actions}>
          
          {!isLoading&&<button>{isLogin?'Login': 'Create Account'}</button>}
          {isLoading&&<p>sending request.........</p>}

          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;