import React from 'react';
import   '../Views/Login/Login.css' ;

export default function Button(props) {
      
      
    return (
       <React.Fragment>
  <button className={props.className} onClick={props.onClick}>{props.name} </button>
       </React.Fragment>
    );
  }
  