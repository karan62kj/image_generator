import React from 'react';
import ReactCrop from 'react-image-crop';
import * as constants from '../../Constants';
import {connect} from 'react-redux';
import 'react-image-crop/dist/ReactCrop.css';
import classes from './CropUpload.module.css';
import {getCroppedImg} from '../../Utilities/getCroppedImage';
import Button from '../../Components/Button/Button';
import Modal from '../../Components/Modal/Modal';
import {uploadImage} from '../../Utilities/uploadImage';
import OutputLinks from '../../Components/OutputLinks/outputLinks';


// This component is used to set the portion of crop and upload the images
class CropUpload extends React.Component
{
    // state for modal visibility and outputLinks 
    state={
        modal:false,
        errorMsg:'',
        outputLinks :[]
    }

// this method is trigged when the crop is complete and generate the new src for the image
    onCropComplete= async(name,crop)=>{
       let dataimg =  await getCroppedImg(this.props.store.src,crop);
       this.props.setOutputSrc(name,dataimg);
    }
     
   
    // this method is triggered whenever we are moving the crop
    setCropHandler = (name,crop)=>{
        let index = this.props.store.outputimages.findIndex(el=>el.name===name);
        let oldcrop = this.props.store.outputimages[index].crop;
        if(crop.x !== oldcrop.x || crop.y !==oldcrop.y || !this.props.store.outputimages[index].initial)
        {
           this.props.setInitial(name,true);
           this.props.setCrop(name,crop);
           this.onCropComplete(name,crop);
        }
    }   

  

// this method is triggered when we click on the upload button
    uploadHandler=()=>{
        this.setState({
            modal:true 
        })
        Promise.all(this.props.store.outputimages.map(el=>{
            return uploadImage(el) // upload image is present in utilities folder takes care of async upload of pic
             })).then(res=>{
               this.setState({
                   outputLinks:res
               })
        }).catch(err=>{
            this.setState({
                modal:true,
                errorMsg:'there is some network error. Please try again'
            })
        })
    }

    // this method is triggered when cancel button of modal is clicked
    onCancelHandler=()=>{
        this.setState({
            modal:false,
            errorMsg:''
        })
    }


render()
{
    let modal=null;

  // when modal is in processing state
   if(this.state.modal)
   {
    modal =  <Modal active={this.state.modal} onCancel={this.onCancelHandler}><p>Please wait your request has been processing.....</p></Modal>
   }

 // when modal will show error
    if(this.state.modal && this.state.errorMsg)
    {
    modal = <Modal active={this.state.modal} onCancel={this.onCancelHandler}>{this.state.errorMsg}</Modal>
    }

 // when modal will show result
    if(this.state.outputLinks.length)
    {
    modal = <Modal active={this.state.modal} onCancel={this.onCancelHandler}>
        {this.state.outputLinks.map((el,ind)=>(<OutputLinks link={el.data.data.url} 
                                                            label={this.props.store.outputimages[ind].name} height={this.props.store.outputimages[ind].height} width={this.props.store.outputimages[ind].width}/>))}
        </Modal>
    }




    return(<>
    {modal}
    <div className={classes.cropContainer}>
        {this.props.store.outputimages.map(el=>{
            return (<div className={classes.cropBox} key={el.name}>
                    <h3>{el.name}</h3>
                    <ReactCrop src={this.props.store.src} 
                           crop={el.crop} 
                           className={classes.reactcrop} 
                           onChange = {(newcrop)=>this.setCropHandler(el.name,newcrop)} 
                           locked/>
                </div> )
        })}
        <div className={classes.uploadBox}>
            <Button name="Upload" onClick={this.uploadHandler}/>
        </div>
        </div></>)
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
       setOutputSrc : (name,src)=>dispatch({type:constants.SET_OUTPUTSRC,name,src}),
       setCrop :(name,crop)=>dispatch({type:constants.SET_CROP,name,crop}),
       setInitial:(name,initial)=>dispatch({type:constants.SET_INITIAL,name,initial})
     }
   }
   
   export default connect(mapStoreWithProps,mapActionsWithProps)(CropUpload);