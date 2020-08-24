import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import WithAuth from '../components/AuthProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Carousel, Button } from 'react-bootstrap';
import { checkExistUSer } from '../services/authenticate/auth-client.service';
import SubHeader from '../components/SubHeader/SubHeader';
import FormCompactField from '../components/FormCompactField/FormCompactField';
import FormAvatar from '../components/FormAvatar/FormAvatar';

const SignupClient = (props) => {
  let history = useHistory();

  const totalSteps = 7;

  const { signupUser } = WithAuth();
  const [step, setStep] = useState(0);
  const [backLink, setBackLink] = useState(null);
  const [activeIndex, setActiveIndex] = useState(step);
  const [loginValidation, setLoginValidation] = useState(true);
  const [title, setTitle] = useState('Registro');

  const [controls, setControls] = useState(false);
  const [touch, setTouch] = useState(false);
  const [interval, setInterval] = useState(null);

  const nextStep = () => {
    if (checkStep(step)) setStep(step + 1);
  };

  const prevStep = () => {
    if (checkStep(step)) setStep(step - 1);
  };

  const checkStep = (newStep) => {
    if (newStep >= totalSteps) {
      return false;
    }
    return true;
  };

  const handleBackLink = () => {
    return step > 0 ? setBackLink(() => prevStep) : setBackLink(null);
  };

  useEffect(() => {
    setActiveIndex(step);
    handleBackLink();
  }, [step]);

  // FORMIK

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .email('*El email no es válido')
        .required('*El email es necesario'),
      password: Yup.string()
        .min(6, '*Tiene que contener 6 letras o más')
        .required('*La contraseña es necesaria'),
      repeatPassword: Yup.string()
        .required('Required')
        .test(
          'password-match',
          'Password must match',
          (value) => this.parent.password === value
        ),
    }),
    onSubmit: (values) => {
      // This will run when the form is submitted
    },
  });

  const checkExistingUser = async (event) => {
    if (!formik.errors.username) {
      const { value } = event.target;
      const isUser = await checkExistUSer(value);
      if (!isUser) {
        setLoginValidation(true);
      } else {
        setLoginValidation(false);
        return formik.touched.username && formik.errors.username;
      }
    }
  };

  const handleFieldClass = (name) => {
    return {
      error: formik.touched[name] && formik.errors[name],
      'is-invalid': formik.touched[name] && formik.errors[name],
      'is-valid': formik.touched[name] && !formik.errors[name],
    };
  };

  const handleButton = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (formik.touched[name] && !formik.errors[name]) {
      if (Object.entries(formik.errors).length > 0) {
        setLoginValidation(false);
      } else {
        setLoginValidation(true);
      }
    }
  };

  return (
    <div className='signup-page'>
      <SubHeader title={title} history={history} action={backLink} />
      <Form onSubmit={formik.handleSubmit} onBlur={handleButton}>
        <Carousel
          controls={controls}
          touch={touch}
          interval={interval}
          activeIndex={activeIndex}
        >
          <Carousel.Item>
            <h2>1. DATOS DE TU CUENTA</h2>

            <Form.Group controlId='username'>
              <FormCompactField>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  name='username'
                  {...formik.getFieldProps('username')}
                  className={handleFieldClass('username')}
                />
              </FormCompactField>
              {formik.touched.username && formik.errors.username && (
                <div className='error-message'>{formik.errors.username}</div>
              )}
            </Form.Group>

            <Form.Group controlId='password'>
              <FormCompactField>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  {...formik.getFieldProps('password')}
                  className={handleFieldClass('password')}
                />
              </FormCompactField>
              {formik.touched.password && formik.errors.password && (
                <div className='error-message'>{formik.errors.password}</div>
              )}
            </Form.Group>

            <Form.Group controlId='repeatPassword'>
              <FormCompactField>
                <Form.Label>Repetir contraseña</Form.Label>
                <Form.Control
                  type='password'
                  name='repeatPassword'
                  {...formik.getFieldProps('repeatPassword')}
                  className={handleFieldClass('repeatPassword')}
                />
              </FormCompactField>
              {formik.touched.repeatPassword &&
                formik.errors.repeatPassword && (
                  <div className='error-message'>
                    {formik.errors.repeatPassword}
                  </div>
                )}
            </Form.Group>

          </Carousel.Item>

          <Carousel.Item>
            <h2>2. DATOS DE TU PERFIL</h2>
            <FormAvatar values={formik.values} />
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
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Button
          disabled={!loginValidation}
          variant='primary'
          size='lg'
          type='submit'
          onClick={() => nextStep()}
        >
          Continuar
        </Button>
        <p className='mt-3'>
          Already have account? <Link to={'/login'}> Login</Link>
        </p>
      </Form>
    </div>
  );
};

export default SignupClient;
