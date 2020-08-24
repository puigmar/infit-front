import React, { Fragment, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';

function ClientSignupStep3(props) {

  const checkButton = () => {
    console.log(formik3.errors)
    props.handleButton(formik3.errors)
  }

  const showData = (values) => {
    formik3.handleSubmit();
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
      availability: ''
    },
    validateOnMount:  true,
    validationSchema: Yup.object().shape({
      trainningDays: Yup.array().required("Almenos tienes que escoger 1 día"),
      availability: Yup.string().required('Tienes que escoger una franja horaria'),
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
              value="monday"
              name="trainningDays"
              onChange={formik3.handleChange}
            />
            <Form.Check 
              type="checkbox" 
              label="Martes" 
              value="tuesday"
              name="trainningDays"
              onChange={formik3.handleChange}
            />
            <Form.Check 
              type="checkbox" 
              label="Miércoles" 
              value="wednesday"
              name="trainningDays"
              onChange={formik3.handleChange}
            />
            <Form.Check 
              type="checkbox" 
              label="Jueves" 
              value="thursday"
              name="trainningDays"
              onChange={formik3.handleChange}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group controlId="availability">
          <Form.Label>¿Qué horario prefieres?</Form.Label>
          <Form.Group controlId="availability">
            <Form.Control 
              as="select" 
              name="availability"
              value={formik3.values.availability}
              onChange={formik3.handleChange}
              onBlur={formik3.handleBlur}
            >
              <option value="Escoge una franja horaria"></option>
              <option value="[9,13]">Mañanas, de 9h a 13h</option>
              <option value="[14,20]">Tardes, de 14h a 20h</option>
              <option vale="[21,23]">Noches de 21h a 23h</option>
            </Form.Control>
          </Form.Group>
        </Form.Group>
      </Form>
      <Button disabled={props.buttonDisabled} type="submit" variant="primary" size="lg" onClick={() => props.nextStep()}>Continuar</Button>
    </Fragment>
  )
}

export default ClientSignupStep3
