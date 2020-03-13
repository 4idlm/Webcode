import React from 'react';
import './Login.css';
import INPUT from '../../Component/Input';
import sha512 from 'sha512';
import history from '../history';
import axios from 'axios';

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
  componentDidMount(){
    const bearer_token =  localStorage.getItem("AccessToken");
    // console.log(token,"didmount")
    if(bearer_token != undefined && bearer_token != ""){
      history.push("/protected")
    }
    else{
      history.push("/")
    }


  }
  Submit=(event)=>{
    event.preventDefault();
    let info = this.state.form;
    let passwordHash = info.Password.value.trim();
   let hash = sha512(passwordHash);
   let binarycodecovertToHash = hash.toString('hex');
   let usermail = info.Username.value.trim();
   let data =  {
    email: usermail,
    password: binarycodecovertToHash
  }
   if(info.Username.value == "" && info.Password.value == "" || info.Password.value == "" || info.Password.value == "" ){
     alert("Please fill the values")
   }
if(info.Password.value != ""  && info.Username.value != "" )
{
  axios.post(`http://dev.api.staller.show/v1/users/login`, data)
  .then(res => {
    if(res.status == 200 ){
      let token = res.data.data.access_token;
    if (typeof(Storage) !== "undefined") {
     localStorage.setItem("AccessToken", token);
     history.push('/protected');
    }
    }
    console.log(res);
    console.log(res.data);
  }).catch((error) => {
    // Error 😨
    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        this.props.Closemodal();
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