import React from 'react' ;
import './component.css';
import Autosuggest from './AutoSuggest';

class Modal extends React.Component {
   
    state={
        form :{ 
         Horsenumber:{ 
           type:"text",
           placeholder:"",
           required:true,
           name:"Horsenumber",
           value:""
         },
         Color:{ 
            type:"select",
            placeholder:"",
            required:true,
            name:"Color",
            value:""
          }
       }
    }
    
render(){
  
    return(
        <React.Fragment>
          
          <div id="myModal" class={`modal ${this.props.toggle ? "Openpopup" : "Closepopup"}`}>
 
  <div class="modal-content">
    <div class="modal-header">
    <h2>Creat Horse</h2>
      <span class="close" onClick={this.props.Closemodal}>&times;</span>
    </div>
    <div class="modal-body">
     <Autosuggest />
    </div>
     
  </div>

</div>  
        </React.Fragment>
    )

}


}

export default Modal ;