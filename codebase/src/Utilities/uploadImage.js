import Axios from 'axios';
import {dataURItoBlob} from './dataURItoBlob';



const  config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest'
    }
  };

  const key = '43722a73c015bc4b8ce7731bf136bdb6';


  // utility function to upload image to hosting
export const  uploadImage =(imageobject)=>{
    let imgdata = imageobject['src'];
    let blob = dataURItoBlob(imgdata);
    let formData = new FormData(document.forms[0]);
   formData.append('image', blob);
   return Axios.post(`https://cors-anywhere.herokuapp.com/https://api.imgbb.com/1/upload?key=${key}`,formData,config)
}