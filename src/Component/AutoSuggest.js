import React from 'react';
import chunkData from '../Store';
// const axios = require('axios');
import axios from 'axios';

class Autosuggest extends React.Component{

state={
    AccessToken:'',
    autoSUggetHorse:""
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
    Horsename = (event)=>{
         let value =  event.target.value;
         const bearer_token =  localStorage.getItem("AccessToken");
         // console.log(token,"didmount")
         var bearer = 'Bearer ' + bearer_token;
         this.setState({
            autoSUggetHorse:value
         })
         chunkData.Autosuggestvalue = event.target.value ; 
        let Url = `http://dev.api.staller.show/v1/horses/${value}`;
        var config = {
          headers:   {'Authorization': bearer}
        };
      
        axios.get(Url,config)
          .then(res => {
            console.log(res);
            console.log(res.data);
          //  this.HoreseListApi();
          }).catch(error=>{
            console.log(error,"error")
          }) 
 
    }
render(){
return(<React.Fragment>
     <div  className="form-group">
            <input  type="text" name="" value={this.state.autoSUggetHorse} onChange={this.Horsename} maxLength="255" className="form-control" />
            <label className="form-label">Horse Name</label>
          </div>
</React.Fragment>)
}
}

export default Autosuggest;

