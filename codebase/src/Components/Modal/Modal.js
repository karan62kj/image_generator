import React from 'react';
import classes from './Modal.module.css';
import Button from '../../Components/Button/Button';


// This is a modal component with black backdrop and white modal controlled through active prop having boolean value
const Modal =(props)=>{

     let activeclass = '';

     if(props.active)
     {
         activeclass = classes.active;
     }

    return (<>
    <div className={classes.backdrop+' '+ activeclass}></div>
    <div className={classes.modal +' '+ activeclass}>
       <div className={classes.modalHeader}><div>{props.heading?props.heading:'Info'}</div></div>
       <div className={classes.modalBody}>{props.children}</div>
       <div className={classes.modalFooter}><Button name="Cancel" onClick={props.onCancel}/></div>
    </div>
    </>)

}

export default Modal;