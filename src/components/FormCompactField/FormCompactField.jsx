import React from 'react';
import './FormCompactField.css';

const FormCompactField = (props) => {  


  const handleFocus = (e) => {
    const target = e.target.parentNode;
    const input = target.querySelector('.form-control');
    target.classList.add('isFocus')
  }

  const handleBlur = (e) => {
    const target = e.target.parentNode;
    const input = target.querySelector('.form-control');
    target.classList.remove('isFocus')
  }

  const handleFilled = (e) => {
      const target = e.target.parentNode;
      const input = target.querySelector('.form-control');

      if(input.value == ''){
        target.classList.remove('isFilled')
      } else {
        target.classList.add('isFilled')
      }
  }

  return (
    <div className="field-compact" onBlur={(e) => handleBlur(e)} onFocus={(e)=> handleFocus(e)} onChange={(e) => handleFilled(e)}>
      {props.children}
    </div>
  )
}

export default FormCompactField
