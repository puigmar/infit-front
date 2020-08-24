import React, { Fragment, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import FormCompactField from '../FormCompactField/FormCompactField'

function ClientSignupStep3(props) {

  const checkButton = () => {
    console.log(formik3.errors)
    props.handleButton(formik3.errors)
  }

  useEffect(() => {
    if(!formik3.isValid){
      props.setButtonDisabled(true)
    } else {
      props.setButtonDisabled(false)
    }
  }, [props.step])

  const formik3 = useFormik({
    initialValues: {
      trainningDays: [],
      availability: []
    },
    validateOnMount:  true,
    validationSchema: Yup.object().shape({
      trainningDays: Yup.array().required("At least one checkbox is required"),
      availability: Yup
      .string()
      .oneOf([[8,13],[14,20],[21,23]])
      .required('Please indicate your communications preference')
    }),
    onSubmit: values => {
      console.log(formik3.values)
    }
  });

  const handleFieldClass = (name) => {
    return ({
      'error': formik3.touched[name] && formik3.errors[name],
      'is-invalid': formik3.touched[name] && formik3.errors[name],
      'is-valid': formik3.touched[name] && !formik3.errors[name],
    })
  }

  return (
    <Fragment>
      <Form onSubmit={formik3.handleSubmit} onBlur={checkButton}>
        <Form.Group controlId="trainningDays">
          <Form.Label>¿Que día quieres entrenar?</Form.Label>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check 
              type="checkbox" 
              label="Lunes" 
              value={formik3.values.monday}
              name={"trainningDays"}
              className={handleFieldClass('trainningDays')}
            />
            <Form.Check 
              type="checkbox" 
              label="Martes" 
              value={formik3.values.tuesday}
              name={"trainningDays"}
              className={handleFieldClass('trainningDays')}
            />
            <Form.Check 
              type="checkbox" 
              label="Miércoles" 
              value={formik3.values.wednesday}
              name={"trainningDays"}
              className={handleFieldClass('trainningDays')}
            />
            <Form.Check 
              type="checkbox" 
              label="Jueves" 
              value={formik3.values.thursday}
              name={"trainningDays"}
              className={handleFieldClass('trainningDays')}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group controlId="availability">
          <Form.Label>¿Qué horario prefieres?</Form.Label>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Control as="select" onChange={formik3.handleChange} name="availability">
              <option value="" label="Selecciona un rango horario" />
              <option value={[8,13]}>Mañana, entre 8h y 13h</option>
              <option value={[14,20]}>Tarde, entre las 14h y las 20h</option>
              <option value={[21,23]}>Noche, entre las 21 y las 23h</option>
            </Form.Control>
          </Form.Group>
        </Form.Group>
      </Form>
    </Fragment>
  )
}

export default ClientSignupStep3
