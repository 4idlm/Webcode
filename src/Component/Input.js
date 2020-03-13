import React from 'react';


export default function Input(props) {
      let rendercomponet ; 
    
              switch(props.type){
                    case "text" : 
                       rendercomponet = <input type= {props.type} name={props.name}  className={props.name}
                       value ={props.value} onChange={props.onChange} {...props} />
                       break;
                       case "select-one": 
                       console.log(props.value,"props.value")
                       rendercomponet =  <select
                       name={props.name}
                       className={props.className}
                       type={props.type}
                       
                       value={props.value}
                       onChange={props.onChange}
                      
                     >
                       {props.elementConfig.options.map(options => {
                         return (
                           <option key={options.key} value={options.value}>
                             {options.value}
                           </option>
                         );
                       })}
                     </select>
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
  