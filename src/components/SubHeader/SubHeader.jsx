import React from 'react'
import './SubHeader.css';

const SubHeader = (props) => {
  const { history, action } = props;

  return (
    <div className="subHeader">
      {
        action 
        ? (<span className="backLink icon-backLinksvg" onClick={action}></span>) 
        : history && (<span className="backLink icon-backLinksvg" onClick={() => history.goBack()}></span>)
      }
      
      <h1>{props.title}</h1>
    </div>
  )
}

export default SubHeader
