import React, { Fragment, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import CustomCheck from '../CustomCheck/CustomCheck'

function ClientSignupStep4(props) {

  const [disabledButton, setDisabledButton] = useState(true)
  // Formik
  const formik = useFormik({
    initialValues: {
      objective: '',
    },
    validationSchema: Yup.object().shape({
      objetive: Yup.string().oneOf(['Perder peso', 'Ganar Músculo', 'Mantenerse'])
                                .required("Tienes que escoger un objectivo"),
    }),
    onSubmit: values => {
      const { objective } = values;
      const stepData = {
        client: {
          ...props.dataClient,
          wizard: {
            ...props.dataClient.wizard,
            objective,
          }
        }
      }
      console.log('stepData: ', stepData)
      props.handleData(stepData)
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
        <Form.Group>
          <CustomCheck 
            {...formik.getFieldProps('objective')}
            label="Perder peso"
            value="Perder Peso"
          />
          <CustomCheck 
            {...formik.getFieldProps('objective')}
            label="Ganar Músculo"
            value="Ganar Músculo"
          />
          <CustomCheck 
            {...formik.getFieldProps('objective')}
            label="Mantenerse"
            value="Mantenerse"
          />
        </Form.Group>
        <Button disabled={ disabledButton} type="submit" variant="primary" size="lg">Continuar</Button>
      </Form>
    </Fragment>
  )
}

export default ClientSignupStep4
