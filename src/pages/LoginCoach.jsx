import React, { useState, Fragment, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import BoxSkew from '../components/BoxSkew/BoxSkew';
import SectionBg from '../components/SectionBg/SectionBg';
import FormCompactField from '../components/FormCompactField/FormCompactField.jsx'
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import SubHeader from '../components/SubHeader/SubHeader';


const LoginCoach = () => {
  const { loginUser, setHeaderBackground } = WithAuth();
  const [title, setTitle] = useState('Login Entrenador')
  const [formCompleted, setFormCompleted] = useState(false)

  let history = useHistory();

  const handleFormSubmit = (event) => {
    const { username, password } = formik.values;
    try {
      event.preventDefault();
      const { username, password } = formik.values;
      loginUser({ username, password, isCoach:true });
    }
    catch(err){
      console.log(err)
    } 
  };

  const formik = useFormik({
    initialValues: {
      username: '', 
      password: ''
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
      .email("*El email no es válido")
      .required("*El email es necesario"),
      password: Yup.string()
      .min(6, "*Tiene que contener 6 letras o más")
      .required("*La contraseña es necesaria"),
    })
  });

  const handleFieldClass = (name) => {
    return ({
      'error': formik.touched[name] && formik.errors[name],
      'is-invalid': formik.touched[name] && formik.errors[name],
      'is-valid': formik.touched[name] && !formik.errors[name],
    })
  }

  const checkFormEmptyFields = () => {
    setFormCompleted(true)
    for(let field in formik.values){
      if(formik.values[field] === '' || Object.keys(formik.errors).length > 0){
        setFormCompleted(false)
      }
    }
  }

  useEffect(() => {
    setHeaderBackground(false)
  }, []);

  useEffect(() => {
    checkFormEmptyFields()
  }, [formik.values, formik.errors]);

  return (
    <Fragment>
    <SubHeader title={title} history={history} />
    <section className="login-page login-page--coach box-layout BgDiagonal">
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="username">
            <FormCompactField>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps('username')}
                className={handleFieldClass('username')}
              />
              {(formik.touched.username && formik.errors.username ) && ( <div className="error-message">{formik.errors.username}</div> )}
            </FormCompactField>
          </Form.Group>

          <Form.Group controlId="password">
            <FormCompactField>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...formik.getFieldProps('password')}
                className={handleFieldClass('password')}
              />
              {(formik.touched.password && formik.errors.password ) && ( <div className="error-message">{formik.errors.password}</div> )}

            </FormCompactField>
          </Form.Group>
          <Button type="submit" variant="primary" size="lg" className="mt-4">Iniciar sesión</Button>
        </Form>
    </section>
    </Fragment>
  );
};

export default LoginCoach;
