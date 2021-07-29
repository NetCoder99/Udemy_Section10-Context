import React, {useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef (
   (props, ref) => {
  console.log("Input:props:isValid:" + props.isValid);
  const inputRef = useRef();

  const activate  = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {focus: activate};
  });

  return (
    <div className={`${classes.control} ${props.isValid === false ? classes.invalid : ""}`}>
      <label htmlFor={props.id}>{props.text}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.changeHandler}
        onBlur={props.blurHandler}
      />
    </div>
  );
});
export default Input;
