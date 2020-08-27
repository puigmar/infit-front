import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import FormCompactField from '../components/FormCompactField/FormCompactField'
import WithAuth from '../components/AuthProvider';
import SubHeader from '../components/SubHeader/SubHeader'


const SignupCoach = () => {

  const { signupUser } = WithAuth();

  let history = useHistory();

  const [disabledButton, setDisabledButton] = useState(true)
  const [formCompleted, setFormCompleted] = useState(false)
  const [title, setTitle] = useState('Registro Entrenador')

  // Formik

  const formik = useFormik({
    initialValues: {
      username: '', 
      password: '',
      repeatPassword: '',
      nameUser: ''
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
      ),
      nameUser: Yup.string()
      .required("*Este campo no puede quedar vacío")
    }),
    onSubmit: values => {
      const { username, password, nameUser } = values;
      const dataCoach = {
        user: {
          username,
          password,
          isCoach: true
        },
        client: {
          name: nameUser
        }
      }
      registerDBCoach(dataCoach)
    }
  });

  const registerDBCoach = (dataCoach) => { 
    const data = dataCoach; // dataCoach || fakeData
    const {user, client} = data;
    const registerCoach = signupUser({ user, client });
  }

  const checkFormEmptyFields = () => {
    setFormCompleted(true)
    console.log('errors: ', formik.errors)
    for(let field in formik.values){
      if(formik.values[field] === ''){
        setFormCompleted(false)
      }
    }
    if(formCompleted === true){
      setDisabledButton(false)
    }
  }

  useEffect(() => {
    checkFormEmptyFields()
  }, [formik.values])

  const handleFieldClass = (name) => {
    return ({
      'error': formik.touched[name] && formik.errors[name],
      'is-invalid': formik.touched[name] && formik.errors[name],
      'is-valid': formik.touched[name] && !formik.errors[name],
    })
  }

  return (
    <Fragment>
      <SubHeader title={title} history={history} />
      <Form onSubmit={formik.handleSubmit} onChange={checkFormEmptyFields}>
        <Form.Group controlId='username'>
          <FormCompactField>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              {...formik.getFieldProps('username')}
              className={handleFieldClass('username')}
            />
            {(formik.touched.username && formik.errors.username ) && ( <div className="error-message">{formik.errors.username}</div> )}
          </FormCompactField>
        </Form.Group>
        
        <Form.Group controlId="password">
          <FormCompactField>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
              type="password" 
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
              {...formik.getFieldProps('repeatPassword')}
              className={handleFieldClass('repeatPassword')}
            />
          </FormCompactField>
          {(formik.touched.repeatPassword && formik.errors.repeatPassword ) && ( <div className="error-message">{formik.errors.repeatPassword}</div> )}
        </Form.Group>
        
        <Form.Group controlId="nameUser">
          <FormCompactField>
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              {...formik.getFieldProps('nameUser')}
              className={handleFieldClass('nameUser')}
            />
          </FormCompactField>
          {(formik.touched.nameUser && formik.errors.nameUser ) && ( <div className="error-message">{formik.errors.nameUser}</div> )}
        </Form.Group>

        <Button disabled={disabledButton} type="submit" variant="primary" size="lg">Registrarse</Button>
        
        <section className="signupBtn">
          <p className="mt-3">¿Ya eres usuario? <Link to={'/login'}>Inicia sesión</Link></p>
        </section>
      </Form>
    </Fragment>
  )
};

export default SignupCoach;
