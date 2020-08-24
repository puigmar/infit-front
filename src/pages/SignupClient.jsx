import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import WithAuth from '../services/AuthProvider';
import { Form, Carousel, Button, Col, Row, FormCheck } from 'react-bootstrap';
import { checkExistUSer } from '../services/auth-service';
import SubHeader from '../components/SubHeader/SubHeader';
import ClientSignupStep1 from '../components/ClientSignup/ClientSignupStep1'
import ClientSignupStep2 from '../components/ClientSignup/ClientSignupStep2'
import ClientSignupStep3 from '../components/ClientSignup/ClientSignupStep3';
import ClientSignupStep4 from '../components/ClientSignup/ClientSignupStep4';


const SignupClient = (props) => {

  let history = useHistory();

  const totalSteps = 7;

  const { signup } = WithAuth();
  const [step, setStep] = useState(0);
  const [backLink, setBackLink] = useState(null)
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [title, setTitle] = useState('Registro')
  const [formCompleted, setFormCompleted] = useState(false)

  // Form Data
  const [dataClient, setDataClient] = useState({
    username: {
      username: '',
      password: '',
      isCoach: false
    },
    client: {
      savePhoto: false,
      name: '',
      surname: '',
      card: '',
      telephone: '',
      biometrics: {
        age: '',
        height: '',
        weight: [],
        sex: '',
      },
      wizard: {
        sportFrecuency: '',
        objective: '',
        trainningDays: [],
        availability: {
          min: '',
          max: '',
        },
        pack: {
          name: '',
          duration: '',
          price: '',
        },
      },
      sexPreference: '',
      adress: '',
      photos: []
    }
  })

  // Carousel
  const [controls, setControls] = useState(false)
  const [touch, setTouch] = useState(false)
  const [interval, setInterval] = useState(null)
  const [activeIndex, setActiveIndex] = useState(step)

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

  const handleData = async (data) => {
    const newData = {
      ...dataClient,
      ...data
    }
    setDataClient(newData);
  }

  useEffect(() => {
    console.log('DataClient: ', dataClient)
  }, [dataClient])

  return (
    <div className="signup-page">
      <SubHeader title={title} history={history} action={backLink} />
      <Carousel controls={controls} touch={touch} interval={interval} activeIndex={activeIndex}>
        <Carousel.Item>
          <h2>1. DATOS DE TU CUENTA</h2>
          <ClientSignupStep1 dataClient={dataClient}  nextStep={nextStep} handleData={handleData} step={step} formCompleted={formCompleted} setFormCompleted={setFormCompleted}/>
        </Carousel.Item> 
        <Carousel.Item>
          <h2>2. DATOS DE TU PERFIL</h2>
          <ClientSignupStep2 dataClient={dataClient}  nextStep={nextStep} handleData={handleData} step={step} formCompleted={formCompleted} setFormCompleted={setFormCompleted}/>
        </Carousel.Item>
        <Carousel.Item>
          <h2>3. DISPONIBILIDAD</h2>
          <ClientSignupStep3 dataClient={dataClient} nextStep={nextStep} handleData={handleData} step={step} formCompleted={formCompleted} setFormCompleted={setFormCompleted}/>
        </Carousel.Item>
          <Carousel.Item>
            <h2>4. OBJETIVOS</h2>
            <ClientSignupStep4 dataClient={dataClient} nextStep={nextStep} handleData={handleData} step={step} formCompleted={formCompleted} setFormCompleted={setFormCompleted}/>
          </Carousel.Item>
        </Carousel>
        <section className="signupBtn">
          <p className="mt-3">Already have account? <Link to={'/login'}> Login</Link></p>
        </section>
    </div>
  );
};

export default SignupClient;
