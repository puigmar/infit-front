import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Carousel } from 'react-bootstrap';
import { checkExistUSer } from '../services/authenticate/auth-client.service';
import WithAuth from '../components/AuthProvider';

const SignupCoach = () => {
const { signupUser } = WithAuth();

  const totalSteps = 7;

  const [step, setStep] = useState(0);
  const [activeIndex, setActiveIndex] = useState(step);
  const [loginValidation, setLoginValidation] = useState(true);
  const [controls, setControls] = useState(false);
  const [touch, setTouch] = useState(false);
  const [interval, setInterval] = useState(null);

  // const nextStep = () => {
  //   if (checkStep(step)) setStep(step + 1);
  // };

  // const prevStep = () => {
  //   if (checkStep(step)) setStep(step - 1);
  // };

  const checkStep = (newStep) => {
    return newStep >= totalSteps ? false : true;
  };

  useEffect(() => {
    setActiveIndex(step);
  }, [step]);

  // const checkExistingUser = (event) => {
  //   const { value } = event.target;
  //   const isUser = checkExistUSer(value);
  //   console.log('isUSer: ', isUser);
  // };

  // Schema for yup

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, '*Names must have at least 2 characters')
      .required('*Name is required'),
    username: Yup.string()
      .email('*Must be a valid email address')
      .required('*Email is required'),
    password: Yup.string()
      .min(6, '*Names must have at least 6 characters')
      .required('*Phone number required'),
  });

  return (
    <div className='signup'>
      <Formik
        initialValues={{
          username: '',
          password: '',
          name: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // When button submits form and form is in the process of submitting, submit button is disabled

          console.log('Estos son los valores', values);
          //signupUser(values);
          
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Fragment>
            <Form onSubmit={handleSubmit}>
              <Carousel
                controls={controls}
                touch={touch}
                interval={interval}
                activeIndex={activeIndex}
              >
                <Carousel.Item>
                  <h1>1. DATOS DE TU CUENTA COACH</h1>

                  <Form.Group controlId='username'>
                    <Form.Control
                      type='text'
                      name='username'
                      onChange={handleChange}
                      onBlur={(event) => {
                        handleBlur(event);
                        // checkExistingUser(event)
                      }}
                      value={values.username}
                      className={touched.username && errors.username && 'error'}
                    />
                    {touched.username && errors.username && (
                      <div className='error-message'>{errors.username}</div>
                    )}
                  </Form.Group>

                  <Form.Group controlId='password'>
                    <Form.Control
                      type='password'
                      name='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={
                        touched.password && errors.password ? 'error' : null
                      }
                    />
                    {touched.password && errors.password && (
                      <div className='error-message'>{errors.password}</div>
                    )}
                  </Form.Group>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src='holder.js/800x400?text=Second slide&bg=282c34'
                    alt='Third slide'
                  />

                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src='holder.js/800x400?text=Third slide&bg=20232a'
                    alt='Third slide'
                  />

                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
              <input
                disabled={!loginValidation}
                variant='primary'
                size='lg'
                type='submit'
                value="Continuar"
                // onClick={() => nextStep()}
              />
            </Form>
            <p>Already have account?</p> <Link to={'/login'}> Login</Link>
          </Fragment>
        )}
      </Formik>
    </div>
  );
};

export default SignupCoach;
