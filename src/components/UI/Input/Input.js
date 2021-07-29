import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  console.log("Input:props:isValid:" + props.isValid);

  return (
    <div className={`${classes.control} ${props.isValid === false ? classes.invalid : ""}`}>
      <label htmlFor={props.id}>{props.text}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.changeHandler}
        onBlur={props.blurHandler}
      />
    </div>
  );
};
export default Input;
