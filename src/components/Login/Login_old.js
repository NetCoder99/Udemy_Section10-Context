import React, { useEffect, useState, useReducer } from 'react';
import {emailReducerFnc}    from './Login.validate';
import {passwordReducerFnc} from './Login.validate';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// const emailReducer = (prevState, action) => {
//   console.log('Login:emailReducer:prevState' + prevState);
//   console.log('Login:emailReducer:action' + action);
//   if (action.type === 'USER_INPUT') {
//     return { value: action.val, isValid: action.val.includes('@') }
//   }
//   if (action.type === 'INPUT_BLUR') {
//     return { value: prevState.value, isValid: prevState.value.includes('@') }
//   }
//   return { value: '', isValid: false }
// };
// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// const passwordReducer = (prevState, action) => {
//   console.log('Login:passwordReducer:prevState' + prevState);
//   console.log('Login:passwordReducer:action' + action);
//   if (action.type === 'USER_INPUT') {
//     return { value: action.val, isValid: action.val.trim().length > 6 }
//   }
//   if (action.type === 'INPUT_BLUR') {
//     return { value: prevState.value, isValid: prevState.value.trim().length > 6 }
//   }
//   return { value: '', isValid: false }
// };


const Login = (props) => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  //const [enteredEmail,    setEnteredEmail]    = useState('');
  //const [emailIsValid,    setEmailIsValid]    = useState();

  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,    dispatchEmail]    = useReducer(emailReducerFnc,    {value: '', isValid: false});
  const [passwordState, dispatchPassword] = useReducer(passwordReducerFnc, {value: '', isValid: false});

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const { isValid: isValidEmail}     = emailState;
  const { isValid: isValidPassword}  = passwordState;

  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log('Login:useEffect:setTimeout');
      setFormIsValid(
        isValidEmail && isValidPassword
      );
    }, 500);
    return () => {
      console.log('Login:useEffect:cleanup');
      clearTimeout(timerId);
    };
  }, [isValidEmail, isValidPassword])

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    //setEnteredEmail(event.target.value);
    //setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value })
    //setEnteredPassword(event.target.value);
    //setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
    //setEmailIsValid(emailState.isValid);
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR'});
    //setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
