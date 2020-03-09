import React from 'react';
import './Login.css';
import INPUT from '../../Component/Input';
import sha512 from 'sha512';
import history from '../history';
import { async } from 'q';

// "var sha512 = require('sha512')";

class Login extends React.Component {

  state = {
    loginResponse:"",
   form :{ Username : { 
       type:"text",
       placeholder:"",
       value:"",
       name:"user",
       required:true
    },
    Password:{ 
      type:"password",
      placeholder:"",
      required:true,
      name:"password",
      value:""
    }
  }
  }

  UserInfo=(event)=>{
 let info = this.state.form;
 let userInfoCopy = info;
 if(event.target.name == "user"){
 userInfoCopy.Username.value = event.target.value;
  
 }
 if(event.target.name == "password"){
  userInfoCopy.Password.value = event.target.value;
 }
 this.setState({
   form:userInfoCopy
 })  
  }
  Submit=(event)=>{
    event.preventDefault();
    let info = this.state.form;
    let passwordHash = info.Password.value.trim();
   let hash = sha512(passwordHash);
   let binarycodecovertToHash = hash.toString('hex')
   let data =  {
    email: info.Username.value.trim(),
    password: binarycodecovertToHash
  }
   if(info.Username.value == "" && info.Password.value == "" || info.Password.value == "" || info.Password.value == "" ){
    //  alert("vinoth")
   }
if(info.Password.value != ""  && info.Username.value != "" )
{
   
   fetch("http://dev.api.staller.show/v1/users/login",{ 
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
 }).then((response) => {
   if(response.ok && response.status == 200){
    //  console.log(response,"vinoth")
  return response.json();
   }
   else{
    throw new Error('Something went wrong');
 
   }
}).then((data) => {
    let token = data.data.access_token;
    if (typeof(Storage) !== "undefined") {
     localStorage.setItem("AccessToken", token);
     history.push('/protected');
    }
  }).catch(error => {
                   console.log(error);
                })
 
  }
  }
    render() {  
       
      let emptyarray = [];
      for (let [key, value] of Object.entries(this.state.form)) {
        
   let data = {label:key, output:value}
        emptyarray.push(data);
      }
      let login = emptyarray.map((data,index)=>{
            return <div key={index} className="form-group">
            <INPUT value={data.output.value} type={data.output.type} name={data.output.name} onChange={this.UserInfo} className="form-control" />
            <label className="form-label">{data.label}</label>
          </div>
      }) 
      return <React.Fragment>
<div className="panda">
  <div className="ear"></div>
  <div className="face">
    <div className="eye-shade"></div>
    <div className="eye-white">
      <div className="eye-ball"></div>
    </div>
    <div className="eye-shade rgt"></div>
    <div className="eye-white rgt">
      <div className="eye-ball"></div>
    </div>
    <div className="nose"></div>
    <div className="mouth"></div>
  </div>
  <div className="body"> </div>
  <div className="foot">
    <div className="finger"></div>
  </div>
  <div className="foot rgt">
    <div className="finger"></div>
  </div>
</div>
<form>
  <div className="hand"></div>
  <div className="hand rgt"></div>
  <h1> Login</h1>
    {login}
    <button className="btn" onClick={this.Submit}>Login </button>
</form>
<p>{this.state.erro}</p>
      </React.Fragment>

    }
  }

export default Login ;