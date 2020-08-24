import React from 'react'

function CustomCheck(props) {
  return (
    <div className="form-check">
      <input type="radio" name={props.name} id={props.id} className="form-check-input" />
      <label htmlFor={props.id} className="form-check-label">default checkbox</label>
    </div>
  )
}

export default CustomCheck
