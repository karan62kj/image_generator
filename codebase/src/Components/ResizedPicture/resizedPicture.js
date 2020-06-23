import React,{useEffect,useRef} from 'react';
import *  as constants from '../../Constants';
import classes from './ResizedPicture.module.css';


// This component is a card shown on browse screen
const ResizedPicture = (props)=>{

    let canvasref = useRef();

    let {src,height,width,savesrc} = props;

    // this useEffect is used to generate canvas image of required resolutions
useEffect(()=>{
    let ctx = canvasref.current.getContext('2d');
    ctx.clearRect(0,0,width,height);
    let img = new Image();
      img.src = src
        img.onload = (e)=>{
            ctx.drawImage(img,(Math.max(0,((+constants.IMAGE_WIDTH)-(+width))/2)),Math.max(0,((+constants.IMAGE_HEIGHT)-(+height))/2),(+width),(+height),0,0,(+width),(+height));
        var dataImg = canvasref.current.toDataURL();
            savesrc.call(this,dataImg);
        }  
},[src,height,width,savesrc])

return(<div className={classes.ResizedPicture}>
    <div className={classes.canvasbox}><canvas ref={canvasref} width={props.width} height={props.height}> </canvas></div><div className={classes.specs}><h3>{props.name}</h3>
<div><strong>{props.width} X {props.height}</strong></div></div></div>)


}

export default React.memo(ResizedPicture);