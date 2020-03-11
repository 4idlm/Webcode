import React from 'react';
import chunkData from '../Store';
// const axios = require('axios');

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
         let value =  event.target.value
         this.setState({
            autoSUggetHorse:value
         })
         chunkData.Autosuggestvalue = event.target.value ; 
       //  let Url = `http://dev.api.staller.show/v1/horses/${value}`;

//          axios.get(Url)
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
// //         return fetch(Url,{ 
//       method: 'GET', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Authorization': this.state.AccessToken,
       
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *client
//       // body: JSON.stringify(data) // body data type must match "Content-Type" header
//    }).then((response) => {
//      return response.json();
//     // console.log(response,"dta is testing");
//    }).then(result=>{
//      console.log(result,"autisuggest")
      
//    })
//    .catch(error=>{
//        console.log(error,"erro")
//    })
  
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

