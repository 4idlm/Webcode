import React from 'react';
import chunkData from '../Store';
// const axios = require('axios');
import axios from 'axios';
 

class Autosuggest extends React.Component{

state={
    AccessToken:'',
    autoSUggetHorse:"",
    feild:false
}

    componentDidMount(){
        const bearer_token =  localStorage.getItem("AccessToken");
        // console.log(token,"didmount")
        var bearer =  bearer_token;
        if(bearer_token != undefined && bearer_token != ""){
          this.setState({
            AccessToken :bearer
          })
        }
        
    }
    static getDerivedStateFromProps(nextProps, prevState){
       
      if(nextProps.edit== true && chunkData.updaterecord!== undefined && chunkData.updaterecord!== "" && prevState.feild == false ){
        console.log(chunkData.updaterecord.horse_name,"chunkData.updaterecord.horse_name")
        return{
          autoSUggetHorse:chunkData.updaterecord.horse_name
         }
      }
      else if (nextProps.edit== false && prevState.feild == false){
 
return{
  autoSUggetHorse:""
 }
      }
      else{
        return null
      }
    }
    Horsename = (event)=>{
      event.preventDefault();
         let value =  event.target.value;
         const bearer_token =  localStorage.getItem("AccessToken");
         // console.log(token,"didmount")
         var bearer = 'Bearer ' + bearer_token;
         this.setState({
           feild:true,
            autoSUggetHorse:value
         })
          
          chunkData.Autosuggestvalue = value
         
        let Url = `http://dev.api.staller.show/v1/horses/${value}`;
        var config = {
          headers:   {'Authorization': bearer}
        };
      
        axios.get(Url,config)
          .then(res => {
            console.log(res);
            console.log(res.data);
          //  this.HoreseListApi();
          }).catch((error) => {
            // Error 😨
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
               // this.props.Closemodal();
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
          });
 
    }
     
render(){
return(<React.Fragment>
     <div  className="form-group">
            <input  type="text" name="automatch" value={this.state.autoSUggetHorse} onChange={this.Horsename} maxLength="255" className="form-control" />
            <label className="form-label">Horse Name</label>
          </div>
</React.Fragment>)
}
}

export default Autosuggest;

