import React, { Fragment, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import FormCompactField from '../FormCompactField/FormCompactField'

function ClientSignupStep1(props) {
  
  const [disabledButton, setDisabledButton] = useState(true)

  const checkButton = () => {
    props.handleButton(formik.errors)
  }

  useEffect(() => {
    if(!formik.isValid){
      setDisabledButton(true)
    } else {
      setDisabledButton(false)
    }
  }, [props.step])

  const formik = useFormik({
    initialValues: {
      username: '', 
      password: '',
      repeatPassword: ''
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
      .email("*El email no es válido")
      .required("*El email es necesario"),
      password: Yup.string()
      .min(6, "*Tiene que contener 6 letras o más")
      .required("*La contraseña es necesaria"),
      repeatPassword: Yup.string()
      .required('Required')
      .test(
          'password-match',
          'Debe coincidir con tu contraseña',
          function (value) {
              return this.parent.password === value
          }
      )
    }),
    onSubmit: values => {
      console.log('valores: ', values)
      props.handleData(formik.values)
    }
  });

  const handleFieldClass = (name) => {
    return ({
      'error': formik.touched[name] && formik.errors[name],
      'is-invalid': formik.touched[name] && formik.errors[name],
      'is-valid': formik.touched[name] && !formik.errors[name],
    })
  }

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} onBlur={checkButton}>
      <div className="formGrupBlock">
        <Form.Group controlId="username">
          <FormCompactField>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="username"
              {...formik.getFieldProps('username')}
              className={handleFieldClass('username')}
            />
          </FormCompactField>
          {(formik.touched.username && formik.errors.username ) && ( <div className="error-message">{formik.errors.username}</div> )}
        </Form.Group>

        <Form.Group controlId="password">
          <FormCompactField>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
              type="password" 
              name="password" 
              {...formik.getFieldProps('password')}
              className={handleFieldClass('password')}
            />
          </FormCompactField>
          {(formik.touched.password && formik.errors.password ) && ( <div className="error-message">{formik.errors.password}</div> )}
        </Form.Group>

        <Form.Group controlId="repeatPassword">
          <FormCompactField>
            <Form.Label>Repetir contraseña</Form.Label>
            <Form.Control 
              type="password" 
              name="repeatPassword" 
              {...formik.getFieldProps('repeatPassword')}
              className={handleFieldClass('repeatPassword')}
            />
          </FormCompactField>
          {(formik.touched.repeatPassword && formik.errors.repeatPassword ) && ( <div className="error-message">{formik.errors.repeatPassword}</div> )}
        </Form.Group>
      </div>
      <Button disabled={disabledButton} type="submit" variant="primary" size="lg" onClick={() => props.nextStep()}>Continuar</Button>
      </Form>
      
    </Fragment>
  )
}

export default ClientSignupStep1
