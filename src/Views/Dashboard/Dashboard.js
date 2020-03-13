import React  from 'react';
import DataTables from  '../../Component/DataTables';
import Button from '../../Component/Button';
import './Dashboard.css';
import history from '../history';
import Modal from '../../Component/Modal';
import Store from '../../Store';
import axios from 'axios';


class Dashboard extends React.Component {
 
  state =  {
   HorseList : "",
   AccessToken:"",
   PopUp :false,
   edit:false,
   ediRecord:""
  }
  componentDidMount(){
    const bearer_token =  localStorage.getItem("AccessToken");
    // console.log(token,"didmount")
    var bearer = 'Bearer ' + bearer_token;
    if(bearer_token != undefined && bearer_token != ""){
      this.setState({
        AccessToken :bearer
      })
    }
  
    this.HoreseListApi();
  
  }

  HoreseListApi = ()=>{
    // alert("vinot")
    const bearer_token =  localStorage.getItem("AccessToken");
    // console.log(token,"didmount")
    var bearer = 'Bearer ' + bearer_token;
    return fetch("http://dev.api.staller.show/v1/horses",{ 
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Authorization':bearer,
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
     Store.ResponseData = result.data
     this.setState({
      HorseList:result.data
     })
   })
  }
  
  Create=()=>{
    Store.autoSUggetHorse = ""
    this.setState({
      PopUp:true,
      edit:false
    })
  }
  closedModal=  () =>{
     this.setState({
      PopUp:false
    })
    

  }
  Removehorse= (event,parameters)=>{
    event.preventDefault();
    let id = parameters ;
    // console.log(this.s)
    const bearer_token =  localStorage.getItem("AccessToken");
    // console.log(token,"didmount")
    var bearer = 'Bearer ' + bearer_token;
   // let URL = `http://dev.api.staller.show/v1/horses/102`
    
    var config = {
      headers:   {'Authorization': bearer}
    };
    axios.delete(`http://dev.api.staller.show/v1/horses/${id}`,config)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.HoreseListApi();
      }).catch(error=>{
        console.log(error,"error")
      }) 
  } 
  
  UpdateHorse=(event,parameters)=>{
    event.preventDefault();
    let id = parameters.id ;
  //  console.log(parameters,"paramteres") ;
    Store.updaterecord = parameters;
    this.setState({
      ediRecord:parameters
    })
   // console.log(parameters,"parameters")
    this.setState({
      edit:true,
      PopUp:true
    })
     
    
    // console.log(this.s)
  //   const bearer_token =  localStorage.getItem("AccessToken");
  //   // console.log(token,"didmount")
  //   var bearer = 'Bearer ' + bearer_token;
  //  // let URL = `http://dev.api.staller.show/v1/horses/102`
    
   
     
  // var config = {
  //   headers:{'Authorization': bearer}
  // };
  //   axios.put(`http://dev.api.staller.show/v1/horses/${id}`,config)
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //     //  this.HoreseListApi();
  //     }).catch(error=>{
  //       console.log(error,"error")
  //     }) 
  }
  Logout=()=>{
      localStorage.removeItem("AccessToken");
      history.push('/')
  }
    render() {
      
      return <React.Fragment>
        <div className="container">
            <div className="flex mt-2 mb-4"><Button className="btn" onClick={this.Create} name="+ Create horse"/>
            <Button className="btn"  onClick={this.Logout} name="Logout" /> 
            </div> 
           {this.state.HorseList != "" ? <DataTables delete={this.Removehorse} update={this.UpdateHorse} horse={this.state.HorseList}/>  :"...Loading"}
          <Modal EditUserInfo={this.state.ediRecord} EditButton={this.state.edit} horselist={this.HoreseListApi}    toggle={this.state.PopUp} Closemodal={this.closedModal}/>
           </div>
      </React.Fragment>
    }
  }


  export default Dashboard ; 