import React from 'react';
import classes from './OutputLinks.module.css';

// This component is used to display the final links 
const OutputLinks =(props)=>{
    return (<div className={classes.outputlinks}>
        <h2 className={classes.label}>{props.label}: {props.width}X{props.height}</h2>
    <div><span><strong>Link : </strong></span><a href={props.link} rel="noreferrer" target="_blank">{props.link}</a></div>
    </div>)
}

export default OutputLinks