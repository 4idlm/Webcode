import React  from 'react';
import DataTables from  '../../Component/DataTables';
import Button from '../../Component/Button';
import './Dashboard.css';
import history from '../history';
import Modal from '../../Component/Modal';
const axios = require('axios');

class Dashboard extends React.Component {
 
  state =  {
   HorseList : "",
   AccessToken:"",
   PopUp :false
  }
  componentDidMount(){
    const bearer_token =  localStorage.getItem("AccessToken");
    // console.log(token,"didmount")
    var bearer = 'Bearer ' + bearer_token;
    if(bearer_token != undefined && bearer_token != ""){
      this.setState({
        AccessToken :bearer
      })
    fetch("http://dev.api.staller.show/v1/horses",{ 
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
   }).then((response) => {
     return response.json();
    // console.log(response,"dta is testing");
   }).then(result=>{
     console.log(result)
     this.setState({
      HorseList:result.data
     })
   })
  }

  }
  Create=()=>{
    this.setState({
      PopUp:true
    })
  }
  closedModal=()=>{
    this.setState({
      PopUp:false
    })
  }
  Removehorse=async(event,parameters)=>{
    event.preventDefault();
    let id = parameters ;
    // console.log(this.s)
    const bearer_token =  localStorage.getItem("AccessToken");
    // console.log(token,"didmount")
    var bearer = 'Bearer ' + bearer_token;
    let URL = `http://dev.api.staller.show/v1/horses/`
    // acvigneshwaranc@gmail.com
     fetch(URL,{ 
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      "Access-Control-Allow-Origin": "*",
      //"Vary":"Authorization,Origin",
      'Authorization': this.state.AccessToken,
         'Content-Type': 'application/json',
         "Access-Control-Allow-Headers": "Content-Type" ,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT, PATCH",
       //'Access-Control-Allow-Credentials': 'true',
    //  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie",
      // "Access-Control-Request-Method":"*",
     // "Access-Control-Request-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie",
	 'Content-Type': 'application/json',
    },
   
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    //body: JSON.stringify(data) // body data type must match "Content-Type" header
 }).then((response) => {
  
  return response.json();
  
}).then((data) => {
 
    console.log(data,"delete")
  }).catch(error => {
                   console.log(error);
                })
 
  }
   // alert("vint",parameters)
    // let deleteHorselist = this.state.HorseList;
    // console.log(deleteHorselist)
    // let updatehorse = deleteHorselist.splice(parameters,1);
    // console.log(updatehorse)
   // this.setState({
//       HorseList:deleteHorselist
//     })
// console.log(this.state.HorseList,"parameters")
  
  Logout=()=>{
      localStorage.removeItem("AccessToken");
      history.push('/')
  }
    render() {
      let {HorseList} = this.state
      
      
      return <React.Fragment>
        <div className="container">
            <div className="flex mt-2 mb-4"><Button className="btn" onClick={this.Create} name="+ Create horse"/>
            <Button className="btn"  onClick={this.Logout} name="Logout" /> 
            </div> 
           {this.state.HorseList != "" ? <DataTables delete={this.Removehorse}  horse={this.state.HorseList}/>  :" "}
          <Modal  toggle={this.state.PopUp} Closemodal={this.closedModal}/>
           </div>
      </React.Fragment>
    }
  }


  export default Dashboard ; 