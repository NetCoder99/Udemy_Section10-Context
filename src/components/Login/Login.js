import React, { useEffect, useState, useReducer, useContext } from 'react';
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

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const { isValid: isValidPassword}  = passwordState;
  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log('Login:useEffect:setTimeout');
      setFormIsValid(
        emailState.isValid && isValidPassword
      );
    }, 500);
    return () => {
      console.log('Login:useEffect:cleanup');
      clearTimeout(timerId);
    };
  }, [emailState.isValid, isValidPassword])

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
    ctx.onLogin(emailState.value, passwordState.value);
  };

  const emailInputProps = {
    id : "email",
    type: "Email",
    text: "E-Mail Address",
    value: emailState.value,
    isValid: emailState.isValid,
    changeHandler: emailChangeHandler,
    blurHandler : validateEmailHandler
  };

  const passwordInputProps = {
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

        {/* <div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}

        {/* <div className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={dispatchPassword.value}
            onChange={event => dispatchPassword({ type: 'USER_INPUT', val: event.target.value })}
            onBlur={() => dispatchPassword({ type: 'INPUT_BLUR'})}
          />
        </div> */}

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
