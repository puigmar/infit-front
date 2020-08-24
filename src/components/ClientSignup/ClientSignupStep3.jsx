import React, { Fragment, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';

function ClientSignupStep3(props) {

  const [disabledButton, setDisabledButton] = useState(false)

  // Formik
  const formik = useFormik({
    initialValues: {
      trainningDays: [],
      availability: ''
    },
    validationSchema: Yup.object().shape({
      trainningDays: Yup.array().required("Almenos tienes que escoger 1 día"),
      //availability: Yup.string().required("Tienes que escoger una franja horaria"),
    }),
    onSubmit: values => {
      console.log('ENTRANDO EN onSUBMIT!')
      const { trainningDays, availability } = values;

      const test = JSON.parse(`${availability}`);
      console.log(test)
      
      const stepData = {
        client: {
          ...props.dataClient.client,
          wizard: {
            ...props.dataClient.wizard,
            trainningDays,
          }
        }
      }
      console.log('stepData: ', stepData)
      //props.handleData(stepData)
    }
  });

  const checkFormEmptyFields = () => {
    props.setFormCompleted(true)
    for(let field in formik.values){
      if(formik.values[field] === ''){
        props.setFormCompleted(false)
      }
    }
    if(props.formCompleted === true){
      setDisabledButton(false)
    }
  }

  useEffect(() => {
    console.log('props.formCompleted: ', props.formCompleted)
    checkFormEmptyFields()
  }, [formik.values, props.step])

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} onChange={checkFormEmptyFields}>

        <Form.Group controlId="availability">
          <Form.Label>¿Qué horario prefieres?</Form.Label>
          <Form.Group controlId="availability">
            <Form.Control 
              as="select" 
              {...formik.getFieldProps('availability')}
            >
              <option value="Escoge una franja horaria"></option>
              {/* <option value={{min: 9,max: 13}}>Mañanas, de 9h a 13h</option>
              <option value={{min: 14,max: 20}}>Tardes, de 14h a 20h</option>
              <option vale={{min: 21,max: 23}}>Noches de 21h a 23h</option> */}
              <option value="{min: 9,max: 13}">Mañanas, de 9h a 13h</option>
              <option value="{min: 14,max: 20}">Tardes, de 14h a 20h</option>
              <option vale="{min: 21,max: 23}">Noches de 21h a 23h</option>
            </Form.Control>
          </Form.Group>
        </Form.Group>

        <Form.Group controlId="trainningDays">
          <Form.Label>¿Que día quieres entrenar?</Form.Label>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              {...formik.getFieldProps('trainningDays')}
              type="checkbox" 
              label="Lunes" 
              value="monday"
            />
            <Form.Check 
              {...formik.getFieldProps('trainningDays')}
              type="checkbox" 
              label="Martes" 
              value="tuesday"
            />
            <Form.Check
              {...formik.getFieldProps('trainningDays')}
              type="checkbox" 
              label="Miércoles" 
              value="wednesday"
            />
            <Form.Check
              {...formik.getFieldProps('trainningDays')}
              type="checkbox" 
              label="Jueves" 
              value="thursday"
            />
          </Form.Group>
        </Form.Group>
        <Button  type="submit" variant="primary" size="lg" >Continuar</Button>
      </Form>
    </Fragment>
  )
}

export default ClientSignupStep3
