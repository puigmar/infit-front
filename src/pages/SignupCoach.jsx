import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import FormCompactField from '../components/FormCompactField/FormCompactField'
import WithAuth from '../components/AuthProvider';
import SubHeader from '../components/SubHeader/SubHeader'


const SignupCoach = () => {

  const { signupUser, setHeaderBackground } = WithAuth();

  let history = useHistory();

  const [formCompleted, setFormCompleted] = useState(false)
  const [title, setTitle] = useState('Registro Entrenador')

  

  useEffect(() => {
    setHeaderBackground(false)
  }, [])

  // Formik

  const formik = useFormik({
    initialValues: {
      username: '', 
      password: '',
      repeatPassword: '',
      nameUser: '',
      availability_min: 9,
      availability_max: 24
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
      .email("*El email no es válido")
      .required("*El email es necesario"),
      password: Yup.string()
      .min(6, "*Tiene que contener 6 letras o más")
      .required("*La contraseña es necesaria"),
      repeatPassword: Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        )
      }),
      nameUser: Yup.string()
      .required("*Este campo no puede quedar vacío"),
      availability_min: Yup.number()
      .lessThan(Yup.ref('availability_max'), "Tienes que ser inferior a la franja máxima")
      .required('Tienes que escoger una franja horaria mínima'),
      availability_max: Yup.number()
      .required('Tienes que escoger una franja horaria máxima')
      .moreThan(Yup.ref('availability_min'), "Tienes que ser superior a la franja mínima")
    }),
    onSubmit: values => {
      const { username, password, nameUser, availability_min, availability_max } = values;
      const dataCoach = {
        user: {
          username,
          password,
          isCoach: true
        },
        coach: {
          name: nameUser,
          availability: {
            min: availability_min,
            max: availability_max,
          },
        }
      }
      registerDBCoach(dataCoach)
    }
  });

  const registerDBCoach = (dataCoach) => { 
    const data = dataCoach; // dataCoach || fakeData
    const {coach, user} = data;
    signupUser({ user, client: coach });
  }

  const checkFormEmptyFields = () => {
    setFormCompleted(true)
    console.log('errors: ', formik.errors)
    console.log('formCompleted: ', formCompleted)
    for(let field in formik.values){
      if(formik.values[field] === '' || Object.keys(formik.errors).length > 0){
        setFormCompleted(false)
      }
    }
  }

  const checkAvailability = (e) => {
    const {name, value} = e.target;
    console.log(name)
    const numberValue = value;
    if(numberValue > 24) formik.setFieldValue(name, 24);
    if(numberValue < 9) formik.setFieldValue(name, 9)
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
      <section className="signup-page BgDiagonal box-layout">
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
              {(formik.touched.password && formik.errors.password ) && ( <div className="error-message">{formik.errors.password}</div> )}
            </FormCompactField>
          </Form.Group>
        
        <Form.Group controlId="repeatPassword">
          <FormCompactField>
            <Form.Label>Repetir contraseña</Form.Label>
            <Form.Control 
              type="password" 
              {...formik.getFieldProps('repeatPassword')}
              className={handleFieldClass('repeatPassword')}
            />
            {(formik.touched.repeatPassword && formik.errors.repeatPassword ) && ( <div className="error-message">{formik.errors.repeatPassword}</div> )}
          </FormCompactField>
        </Form.Group>
        
        <Form.Group controlId="nameUser">
          <FormCompactField>
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              {...formik.getFieldProps('nameUser')}
              className={handleFieldClass('nameUser')}
            />
            {(formik.touched.nameUser && formik.errors.nameUser ) && ( <div className="error-message">{formik.errors.nameUser}</div> )}
          </FormCompactField>
        </Form.Group>

        <Form.Group controlId='availability' className="availabilityCoach">
          <Form.Label>¿Qué horario prefieres?</Form.Label>
          <Form.Group controlId='availability'>
            <Form.Label>De</Form.Label>
            <Form.Control
              className={handleFieldClass('availability_min')}
              {...formik.getFieldProps('availability_min')}
              onBlur={(e) => {
                checkAvailability(e)
                formik.handleBlur(e)
              }}
              onChange={(e) => {
                formik.setFieldValue('availability_min',e.target.value)
                checkFormEmptyFields()
              }}
              type="number"
              min="9"
              max="24"
            />
            <Form.Label>a</Form.Label>
            <Form.Control
              className={handleFieldClass('availability_max')}
              {...formik.getFieldProps('availability_max')}
              onBlur={(e) => {
                checkAvailability(e)
                formik.handleBlur(e)
              }}
              onChange={(e) => {
                formik.setFieldValue('availability_max',e.target.value)
                checkFormEmptyFields()
              }}
              type="number"
              min="9"
              max="24"
            />
          </Form.Group>
          {(formik.touched.availability_min && formik.errors.availability_min ) && ( <div className="error-message">{formik.errors.availability_min}</div> )}
          {(formik.touched.availability_max && formik.errors.availability_max ) && ( <div className="error-message">{formik.errors.availability_max}</div> )}

        </Form.Group>

        <Button disabled={!formCompleted} type="submit" variant="primary" size="lg" className="mt-4">Registrarse</Button>
        
        <section className="signupBtn text-center">
          <p className="mt-3">¿Ya eres usuario? <Link to={'/login'}>Inicia sesión</Link></p>
        </section>
      </Form>
      </section>
    </Fragment>
  ) 
};

export default SignupCoach;
