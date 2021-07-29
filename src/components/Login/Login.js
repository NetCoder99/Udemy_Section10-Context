import React, { useEffect, useState, useReducer, useContext, useRef } from 'react';
import AuthContext from '../../store/AuthContextProvider';

import {emailReducerFnc}    from './Login.validate';
import {passwordReducerFnc} from './Login.validate';

import Card    from '../UI/Card/Card';
import classes from './Login.module.css';
import Button  from '../UI/Button/Button';
import Input   from '../UI/Input/Input';

const Login = (props) => {
  const ctx = useContext(AuthContext);

  const [formIsValid,   setFormIsValid] = useState(false);
  const [emailState,    dispatchEmail]    = useReducer(emailReducerFnc,    {value: '', isValid: false});
  const [passwordState, dispatchPassword] = useReducer(passwordReducerFnc, {value: '', isValid: false});

  const emailInputRef = useRef();  
  const passwordInputRef = useRef();  
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log('Login:useEffect:setTimeout');
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);
    return () => {
      console.log('Login:useEffect:cleanup');
      clearTimeout(timerId);
    };
  }, [emailState.isValid, passwordState.isValid])

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };
  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const submitHandler = (event) => {
    console.log('Login:submitHandler');
    event.preventDefault();
    if (formIsValid)
    {ctx.onLogin(emailState.value, passwordState.value);}
    else if (!emailState.isValid) 
    {emailInputRef.current.focus();}
    else if (!passwordState.isValid) 
    {passwordInputRef.current.focus();}
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const emailInputProps = {
    ref: emailInputRef,
    id : "email",
    type: "Email",
    text: "E-Mail Address",
    value: emailState.value,
    isValid: emailState.isValid,
    changeHandler: emailChangeHandler,
    blurHandler : validateEmailHandler
  };

  const passwordInputProps = {
    ref: passwordInputRef,
    id : "password",
    type: "password",
    text: "Password",
    value: passwordState.value,
    isValid: passwordState.isValid,
    changeHandler: passwordChangeHandler,
    blurHandler : validatePasswordHandler
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input {...emailInputProps} />
        <Input {...passwordInputProps} />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
