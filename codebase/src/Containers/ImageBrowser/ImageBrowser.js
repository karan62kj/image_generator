import React from 'react';
import classes from './ImageBrowser.module.css';
import Button from '../../Components/Button/Button';
import * as constants from '../../Constants';
import ResizedPicture from '../../Components/ResizedPicture/resizedPicture';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'; 
import Modal from '../../Components/Modal/Modal';

// This component is used to browse the image and generate the output images with resolution
class ImageBrowser extends React.Component
{
   // state to manage error and modal
  state={
    error:false,
    errorMsg:''
  }
      
  // ref to input field
   inputRef = React.createRef();
    
    // Triggered whenever the new file is browsed
      onFileChangeHandler=(evt)=>{
         let type = evt.target.files[0].type;
         if(!(type==="image/png" || type==="image/jpeg" || type==="image/JPG"))
         {
           
          this.inputRef.current.value = this.inputRef.current.defaultValue;
          this.setState({
            error:true,
            errorMsg:'Please upload the image file with png or jpeg format'
          })
         }
         else{
          let reader = new FileReader();
          reader.onload = (ev)=>{
            if(ev.target.result)
            {
            let image = new Image()
            image.src = ev.target.result;
            image.onload = (e)=>{
              if(image.height!==1024 && image.width!==1024)
              {
                   this.inputRef.current.value = this.inputRef.current.defaultValue;
                   this.setState({
                     error:true,
                     errorMsg:'Please upload the image with resolution 1024 X 1024'
                   })
              }
              else if(this.props.store.src!==image.src)
              {
             this.props.setSrc(image.src)
            }}
          }
          }
          if(evt.target.files[0])
          reader.readAsDataURL(evt.target.files[0]);
         }
      }

      // Triggered when image is loaded, used to set the source of output images
      outputImageHandler=(name,data)=>{
        let index = this.props.store.outputimages.findIndex(el=>el.name===name);
          if(this.props.store.outputimages[index]['src']!==data)
          this.props.setOutputSrc(name,data);
      }

      // triggered when clicked on crop and upload, will route to next page
      cropAndUploadHandler=()=>
      {
         this.props.history.push('/crop_and_upload');
      }
    
      //this method is triggered when cancel button of modal is clicked
      onCancelHandler=()=>{
        this.setState({
          error:false
        })
      }
    
    
      render()
      {
        let uploadbutton = null;
        let modal = null;
          
          if(this.props.store.src)
          { 
            uploadbutton = <div className={classes.buttonBox}><Button name="Set Crop and Upload" onClick={this.cropAndUploadHandler}/></div>
          }

          if(this.state.error)
          {
          modal=<Modal active={this.state.error} onCancel={this.onCancelHandler} heading="oops...error occurred">{this.state.errorMsg}</Modal>
          }
    
    return (<div>
      {modal}
      <h2 className={classes.Applogo}>IMAGE SIZE CONVERTER</h2>
       <input type="file" ref={this.inputRef} onChange={this.onFileChangeHandler} accept="image/png,image/jpeg"  className={classes.input}/>
       <div className={classes.results}>
      {this.props.store.src?this.props.store.outputimages.map(el=>{
        return <ResizedPicture key={el.name} name={el.name} src={this.props.store.src} width={el.width} height={el.height} savesrc={(data)=>this.outputImageHandler(el.name,data)}/>
      }):null}</div>
      {uploadbutton}
      </div>)
    }
}


// mapping redux store with props
const mapStoreWithProps = (state)=>{
 return{store:state}
}

 // mapping redux action dispatcher with props
const mapActionsWithProps = (dispatch)=>{
  return {
    setSrc : (src)=>dispatch({type:constants.SET_SRC,src}),
    setOutputSrc : (name,src)=>dispatch({type:constants.SET_OUTPUTSRC,name,src})
  }
}

export default connect(mapStoreWithProps,mapActionsWithProps)(withRouter(ImageBrowser));