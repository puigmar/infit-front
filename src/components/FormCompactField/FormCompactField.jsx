import React from 'react';
import './FormCompactField.css';

const FormCompactField = (props) => {

  const compactFields = document.querySelectorAll('.field-compact');
  compactFields.forEach(field => {
    field.addEventListener('input', (e)=> {
      const {value} = e.target;
      value === '' ? field.classList.remove('isFilled') : field.classList.add('isFilled')
    })
  })

  return (
    <div className="field-compact">
      {props.children}
    </div>
  )
}

export default FormCompactField
