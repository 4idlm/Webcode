import React from 'react' ;
import './component.css';
import Autosuggest from './AutoSuggest';
import INPUT from './Input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '../Component/Button';

class Modal extends React.Component {
   
    state={
      startDate:"",
      age:"",
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
       },
       radio:{
         True :{
          type:"radio",
          placeholder:"",
          required:true,
          name:"True",
          checked:false
         },
         False:{
          type:"radio",
          placeholder:"",
          required:true,
          name:"False",
          checked:false
         }
       }
    }
    radioverify = (event)=>{
 

      // this.setState({
      //   age:event.target.name
      // })
    }
    handleChange = date => {
    //   moment(date, "YYYY-MM-DD", true).isValid();
    //   const regex = /^02\/(?:[01]\d|2\d)\/(?:19|20)(?:0[048]|[13579][26]|[2468][048])|(?:0[13578]|10|12)\/(?:[0-2]\d|3[01])\/(?:19|20)\d{2}|(?:0[469]|11)\/(?:[0-2]\d|30)\/(?:19|20)\d{2}|02\/(?:[0-1]\d|2[0-8])\/(?:19|20)\d{2}$/;
    // if (!regex.test(date)) {
    //   Status = false;
    // }
      this.setState({
        startDate: date
      });
    };
    handlecheckbox= ()=>{
   this.setState({
    checkbox_data:!this.state.checkbox_data
   })
    }
render(){

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

      let emptyarrayradio = [];
      for (let [key, value] of Object.entries(this.state.radio)) {
        
   let data = {label:key, output:value}
   emptyarrayradio.push(data);
      }
      let RadioInfo = emptyarrayradio.map((data,index)=>{
            return  <div className="col-md-6 col-xs-12">
            <div key={index}  className="">
           <div> <input   type={data.output.type} checked={data.checked} name={data.output.name} onClick={this.radioverify} className="no-border" />
           </div>
           <div>
             <span className="fontsize">{data.label}</span>
             </div>
          </div>
          </div>
      }) 
  
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
      <div className="d-flex">
        <div className='fontsize'>Age Verified</div>
            {RadioInfo}
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