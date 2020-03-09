import React from 'react';


export default function Input(props) {
      let rendercomponet ; 
    
              switch(props.type){
                    case "text" : 
                       rendercomponet = <input type= {props.type} name={props.name}  className={props.name}
                       value ={props.value} onChange={props.onChange} {...props} />
                       break;
                       case "Dropdown" : 
                       rendercomponet = <input type= {props.type} name={props.name}  className={props.name}
                       value ={props.value} onChange={props.onChange} {...props} />
                       break;
                       case "password" : 
                       rendercomponet = <input type= {props.type} name={props.name}  className={props.name}
                       value ={props.value} onChange={props.onChange} {...props} />
                       break;
                    default:
                    rendercomponet =  <input type= {props.type} name={props.name}  className={props.name}
                    value ={props.value} onChange={props.onChange} {...props} />
              }
          
      
    return (
       <React.Fragment>
           {rendercomponet}
       </React.Fragment>
    );
  }
  