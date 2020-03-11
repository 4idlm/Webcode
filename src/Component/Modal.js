import React from 'react' ;
import './component.css';
import Autosuggest from './AutoSuggest';
import INPUT from './Input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '../Component/Button';
import moment from  'moment';
import {  useToasts } from 'react-toast-notifications'
 


class Modal extends React.Component {
   
    state={
      startDate:"",
      True:false,
      False:false,
      checkbox_data:false,
        CreateHorse :{ 
         Horsenumber:{ 
           type:"text",
           placeholder:"",
           required:true,
           name:"Horsenumber",
           value:""
         },
         Color:{ 
            type:"select-one",
            placeholder:"",
            required:true,
            name:"Color",
            elementconfig:{options: [  {key:'',value:''},
                {key:'Red',value:'Red'},
                {key:'Green',value:'Green'},
                {key:'White',value:'White'},
                {key:'Black',value:'Black'},
                {key:'Pink',value:'Pink'}
             ]
            },
            value:"",
            
          }
       }
       
       
    }

     
    submit = (event)=>{
      event.preventDefault();
      let {startDate,True,False,checkbox_data} = this.state ;
      
      let status = True == false && False == false ? false : true;
      
        if(this.state.CreateHorse.Horsenumber.value == "" || this.state.CreateHorse.Color.value == "" || 
        startDate == ""  ||status== false || checkbox_data == false ){
         alert("please fill the value")
          // toast.error("please fill the value !", {
          //   position: toast.POSITION.TOP_LEFT
          // });
          
        }
        else{
          let age = True == true ? true : False == true ? true :false ;
          let newDate = moment(startDate).format("YYYY-MM-DD");
          let data = {
            "horse_name":"testing",
            "horse_number":this.state.CreateHorse.Horsenumber.value ,
            "age_verified":age,
            "dob":newDate,
            "color": this.state.CreateHorse.Color.value,
            "ushja_registered":checkbox_data
          }
          const bearer_token =  localStorage.getItem("AccessToken");
          // console.log(token,"didmount")
          var bearer = 'Bearer ' + bearer_token;
          fetch("http://dev.api.staller.show/v1/horses",{ 
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              'Authorization': bearer
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
         }).then((response) => {
          //  if(response.ok && response.status == 200){
          //   console.log(response,"vinoth")
          return response.json();
          //  }
          //  else{
          //   throw new Error('Something went wrong');
         
          //  }
        }).then((data) => {
          console.log(data,"data");
          if(data.data.status !== undefined && data.data.status !== ""){
            this.props.Closemodal();
          }
            
          }).catch(error => {
                           console.log(error);
                        })
         
        }
    }


    AgeVerified = (e, parameters) => {
      switch (parameters) {
        case "True":
          this.setState({
            True: !this.state.True,
            False:false
          });
          break;
          case "False":
          this.setState({
            False: !this.state.False,
            True:false
          });
          break;
          
        }
      }
    handleChange =( date) => {
      
    let validateformate =   moment(date, "YYYY-MM-DD", true).isValid();
    console.log(validateformate,"validateformate")
    
    if (typeof date === "string") {
      date =date.replace(/[^0-9|/]+/g, "");
    }
    if(validateformate){
      this.setState({
        startDate: date
      });
    }
      
    };
    handlecheckbox= ()=>{
   this.setState({
    checkbox_data:!this.state.checkbox_data
   })
    }
    
    horsecreatr = (event)=>{
    let info = {...this.state.CreateHorse};
 let userInfoCopy = info;
 if(event.target.name == "Horsenumber"){
 userInfoCopy.Horsenumber.value = event.target.value;
  
 }
 if(event.target.name == "Color"){
  userInfoCopy.Color.value = event.target.value;
 }
 this.setState({
   form:userInfoCopy
 })  
}
render(){
 console.log(this.state)

  let emptyarray = [];
      for (let [key, value] of Object.entries(this.state.CreateHorse)) {
        
   let data = {label:key, output:value}
        emptyarray.push(data);
      }
      let CreateHorseInfo = emptyarray.map((data,index)=>{
            return  <div className="col-md-6 col-xs-12">
            <div key={index}  className=" form-group">
            <INPUT value={data.output.value} elementConfig={data.output.elementconfig} type={data.output.type} name={data.output.name} onChange={this.horsecreatr} className="form-control" />
            <label className="form-label">{data.label}</label>
          </div>
          </div>
      }) 
      let label_structure = [
        {
          status: this.state.True,
          name: "True",
          lable: "True"
        },
        {
          status: this.state.False,
          name: "False",
          lable: "False"
        }
       
      ];
      let checkbox_design = label_structure.map(data => {
        return (
          <div className="col-md-4 pt-3 pb-3">
            <label class="radio">
              {data.lable}
              <input
                type="radio"
                onClick={e => this.AgeVerified(e, data.name)}
                checked={data.status}
                name={data.name}
              />
              <span class="checkround" />
            </label>
          </div>
        );
      });
  
     
    return(
        <React.Fragment>
          
          <div id="myModal" class={`modal ${this.props.toggle ? "Openpopup" : "Closepopup"}`}>
 
  <div class="modal-content">
    <div class="modal-header">
    <h2>Creat Info</h2>
      <span class="close" onClick={this.props.Closemodal}>&times;</span>
    </div>
    <div class="modal-body mt-4 container">
     <div className="row"><div className="col-md-6"><Autosuggest /></div> 
     <div className="col-md-6"> 
     <div   className=" form-group">
     <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        dateFormat='yyyy-MM-dd'  
      />
    <label className="DOB_lable">Date Of Birth</label>
          </div>
      </div>
      </div>
      <div className="row mt-5">{CreateHorseInfo}</div>
      <div className="d-flex align-items-center">
        <div className='fontsize'>Age Verified</div>
            {checkbox_design}
      </div>
      
      <div class="container custom-controls mt-3 mb-3 custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="customCheck1" onClick={this.handlecheckbox} checked={this.state.checkbox_data}/>
        <label class="custom-control-label fontsizecheckbox" for="customCheck1">You can check this first option</label>
      </div>
      <Button className="btn"  onClick={this.submit} name="Submit" /> 
    </div>
     
  </div>

</div>  
        </React.Fragment>
    )

}


}

export default Modal ;