import React from 'react';
import ImageBrowser from '../ImageBrowser/ImageBrowser';
import {Route,Redirect} from 'react-router-dom';
import CropUpload from '../CropAndUpload/CropUpload';


// This is the root component of the app 
class App extends React.PureComponent
{
 render()
 {
   return (<>
   <Redirect to='/app'/>     
  <Route path="/app" component={ImageBrowser}/>
  <Route path="/crop_and_upload" component={CropUpload}/>
   </>)
 }
}

export default App;