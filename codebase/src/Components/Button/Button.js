import React from 'react';
import classes from './Button.module.css';


// This is the styled button component 
const Button = (props)=>{
return (<button onClick={props.onClick} className={classes.button}>{props.name}</button>)
}

export default Button;