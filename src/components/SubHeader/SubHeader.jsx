import React from 'react'
import './SubHeader.css';
import { Link } from 'react-router-dom';

const SubHeader = (props) => {
  const { history, action } = props;

  return (
    <div className="subHeader">
      {
        action 
        ? (<span className="backLink icon-backLinksvg" onClick={action}></span>) 
        : (<span className="backLink icon-backLinksvg" onClick={() => history.goBack()}></span>)
      }
      
      <h1>{props.title}</h1>
    </div>
  )
}

export default SubHeader
