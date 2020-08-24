import React, { Fragment, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import FormCompactField from '../FormCompactField/FormCompactField'
import FormAvatar from '../../components/FormAvatar/FormAvatar';


function ClientSignupStep2(props) {

  const checkButton = () => {
    console.log(formik2.errors)
    props.handleButton(formik2.errors)
  }

  useEffect(() => {
    if(!formik2.isValid){
      props.setButtonDisabled(true)
    } else {
      props.setButtonDisabled(false)
    }
  }, [props.step])

  const formik2 = useFormik({
    initialValues: {
      avatarUrl: '',
      nameUser: '',
      surname: '',
      card: '',
      telephone: '',
      age: '',
      height: '',
      weight: '',
      sex: '',
    },
    validateOnMount:  true,
    validationSchema: Yup.object().shape({
      nameUser: Yup.string()
      .required("*Debes escribir tu nombre"),
      surname: Yup.string()
      .required("*Debes escribir tus apellidos"),
      weight: Yup.number()
      .required("*Debes escribir tu peso"),
      height: Yup.number()
      .required("*Debes escribir tu altura"),
      age: Yup.number()
      .required("*Debes escribir tu edad"),
      avatarUrl: Yup.mixed()
      .required("*Debes subir una foto")
    }),
    onSubmit: values => {
      // This will run when the form is submitted
    }
  });

  const handleFieldClass = (name) => {
    return ({
      'error': formik2.touched[name] && formik2.errors[name],
      'is-invalid': formik2.touched[name] && formik2.errors[name],
      'is-valid': formik2.touched[name] && !formik2.errors[name],
    })
  }

  return (
    <Fragment>
      <Form onSubmit={formik2.handleSubmit} onBlur={checkButton}>
      <FormAvatar setButtonDisabled={props.setButtonDisabled} formikName={formik2} />
        <Form.Group controlId="nameUser">
          <FormCompactField>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nameUser"
              {...formik2.getFieldProps('nameUser')}
              className={handleFieldClass('nameUser')}
            />
          </FormCompactField>
          {(formik2.touched.nameUser && formik2.errors.nameUser ) && ( <div className="error-message">{formik2.errors.nameUser}</div> )}
        </Form.Group>

        <Form.Group controlId="surname">
          <FormCompactField>
            <Form.Label>Apellidos</Form.Label>
            <Form.Control 
              type="text" 
              name="surname" 
              {...formik2.getFieldProps('surname')}
              className={handleFieldClass('surname')}
            />
          </FormCompactField>
          {(formik2.touched.surname && formik2.errors.surname ) && ( <div className="error-message">{formik2.errors.surname}</div> )}
        </Form.Group>

        <Form.Group controlId="weight">
          <FormCompactField>
            <Form.Label>Peso</Form.Label>
            <Form.Control
              pattern="\d*" 
              maxLength="3"
              type="text" 
              name="weight" 
              {...formik2.getFieldProps('weight')}
              value={formik2.values.weight}
              className={handleFieldClass('weight')}
            />
          </FormCompactField>
          {(formik2.touched.weight && formik2.errors.weight ) && ( <div className="error-message">{formik2.errors.weight}</div> )}
        </Form.Group>

        <Form.Group controlId="height">
          <FormCompactField>
            <Form.Label>Altura</Form.Label>
            <Form.Control 
              type="text" 
              pattern="\d*" 
              maxLength="3"
              name="height" 
              {...formik2.getFieldProps('height')}
              value={formik2.values.height}
              className={handleFieldClass('height')}
            />
          </FormCompactField>
          {(formik2.touched.height && formik2.errors.height ) && ( <div className="error-message">{formik2.errors.height}</div> )}
        </Form.Group>

        <Form.Group controlId="age">
          <FormCompactField>
            <Form.Label>Edad</Form.Label>
            <Form.Control 
              type="text"
              pattern="\d*" 
              maxLength="2"
              name="age" 
              {...formik2.getFieldProps('age')}
              value={formik2.values.age}
              className={handleFieldClass('age')}
            />
          </FormCompactField>
          {(formik2.touched.age && formik2.errors.age ) && ( <div className="error-message">{formik2.errors.age}</div> )}
        </Form.Group>
      </Form>
    </Fragment>
  )
}

export default ClientSignupStep2
