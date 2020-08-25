import React from 'react'

function CustomCheck(props) {
  return (
    <div className="form-check">
      <input  {...props.formik.getFieldProps('objective')} type="radio" name={props.name} id={props.id} className="form-check-input" defaultChecked={props.defaultChecked} />
      <label htmlFor={props.id} className="form-check-label">{props.label}</label>
    </div>
  )
}

export default CustomCheck
