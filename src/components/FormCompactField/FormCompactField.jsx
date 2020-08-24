import React, {useEffect} from 'react';
import './FormCompactField.css';

const FormCompactField = (props) => {  
  return (
    <div className="field-compact">
      {props.children}
    </div>
  )
}

export default FormCompactField
