import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import WithAuth from '../services/AuthProvider';
import { Form, Carousel, Button, Col, Row, FormCheck } from 'react-bootstrap';
import { checkExistUSer } from '../services/auth-service';
import SubHeader from '../components/SubHeader/SubHeader';
import ClientSignupStep1 from '../components/ClientSignup/ClientSignupStep1'
import ClientSignupStep2 from '../components/ClientSignup/ClientSignupStep2'
import ClientSignupStep3 from '../components/ClientSignup/ClientSignupStep3';


const SignupClient = (props) => {

  let history = useHistory();

  const totalSteps = 7;

  const { signup } = WithAuth();
  const [step, setStep] = useState(0);
  const [backLink, setBackLink] = useState(null)
  const [activeIndex, setActiveIndex] = useState(step)
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [title, setTitle] = useState('Registro')

  const [controls, setControls] = useState(false)
  const [touch, setTouch] = useState(false)
  const [interval, setInterval] = useState(null)

  const nextStep = () => {
    if(checkStep(step)) setStep(step+1)
  }

  const prevStep = () => {
    if(checkStep(step)) setStep(step-1)
  }

  const checkStep = (newStep) => {
    if (newStep >= totalSteps) {
      return false;
    }
    return true;
  }

  const handleBackLink = () => {
    return (step > 0) ? setBackLink(() => prevStep) : setBackLink(null)
  }

  useEffect(() => {
    setActiveIndex(step)
    handleBackLink()
    setButtonDisabled(true)

    const compactFields = document.querySelectorAll('.field-compact');

    compactFields.forEach(field => {
      
      field.addEventListener('input', (e)=> {
        const {value} = e.target;
        value === '' ? field.classList.remove('isFilled') : field.classList.add('isFilled')
      })

      field.addEventListener('focus', (e)=> {
        const {value} = e.target;
        value === '' ? field.classList.add('isFocus') : field.classList.remove('isFocus')
      })

    })

  }, [step])


  // FORMIK

  // const formik = useFormik({
  //   initialValues: {
  //     username: '', 
  //     password: '',
  //     repeatPassword: '',

  //     trainningDays: []
  //   },
  //   validationSchema: Yup.object().shape({
  //     username: Yup.string()
  //     .email("*El email no es válido")
  //     .required("*El email es necesario"),
  //     password: Yup.string()
  //     .min(6, "*Tiene que contener 6 letras o más")
  //     .required("*La contraseña es necesaria"),
  //     repeatPassword: Yup.string()
  //     .required('Required')
  //     .test(
  //         'password-match',
  //         'Debe coincidir con tu contraseña',
  //         function (value) {
  //             return this.parent.password === value
  //         }
  //     ),
  //     trainningDays: Yup.array().required("Tienes que seleccionar almenos un día")
  //   }),
  //   onSubmit: values => {
  //     // This will run when the form is submitted
  //   }
  // });

  // const checkExistingUser = async (event) => {
  //   if(!formik.errors.username){
  //     const { value } = event.target;
  //     const isUser = await checkExistUSer(value); 
  //     if(!isUser) {
  //       setLoginValidation(true)
  //     } else {
  //       setLoginValidation(false)
  //       return formik.touched.username && formik.errors.username
  //     }
  //   }
  // }

  const handleButton = (errors) => {
    (Object.keys(errors).length > 0) ? setButtonDisabled(true) : setButtonDisabled(false)
  }

  return (
    <div className="signup-page">
      <SubHeader title={title} history={history} action={backLink} />
      <Carousel controls={controls} touch={touch} interval={interval} activeIndex={activeIndex}>
        {/* <Carousel.Item>
          <h2>1. DATOS DE TU CUENTA</h2>
          <ClientSignupStep1 setButtonDisabled={setButtonDisabled} step={step} handleButton={handleButton} />
        </Carousel.Item>
        <Carousel.Item>
          <h2>2. DATOS DE TU PERFIL</h2>
          <ClientSignupStep2 setButtonDisabled={setButtonDisabled} step={step} handleButton={handleButton} />
        </Carousel.Item> */}
        <Carousel.Item>
          <h2>3. DISPONIBILIDAD</h2>
          <ClientSignupStep3 setButtonDisabled={setButtonDisabled} step={step} handleButton={handleButton} />
        </Carousel.Item>
        {/*
          <Carousel.Item>
            <h2>3. DISPONIBILIDAD</h2>
            <Form.Check
              type="checkbox"
              label="Lunes"
              custom
              name="trainningDays"
            />
            <Form.Check
              type="checkbox"
              label="Martes"
              custom
              name="trainningDays"
            />
          </Carousel.Item>*/}
        </Carousel>
        <section className="signupBtn">
          <Button disabled={buttonDisabled} variant="primary" size="lg" onClick={() => nextStep()}>Continuar</Button>
          <p className="mt-3">Already have account? <Link to={'/login'}> Login</Link></p>
        </section>
    </div>
  );
};

export default SignupClient;
