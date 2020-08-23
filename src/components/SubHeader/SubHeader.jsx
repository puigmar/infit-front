import React from 'react'
import './SubHeader.css';

const SubHeader = (props) => {
  const { history, action } = props;

  return (
    <div className="subHeader">
      {
        action 
        ? (<span className="backLink icon-backLinksvg" onClick={action}></span>) 
        : ('')
      }
      
      <h1>{props.title}</h1>
    </div>
  )
}

export default SubHeader
