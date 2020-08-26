import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Carousel, Button, Row, Col, Modal } from 'react-bootstrap';
//import { checkExistUSer } from '../services/auth-service';
import WithAuth from '../components/AuthProvider';
import SubHeader from '../components/SubHeader/SubHeader';
import { checkExistUSer } from '../services/authenticate/auth-client.service';
import ClientSignupStep1 from '../components/ClientSignup/ClientSignupStep1';
import ClientSignupStep2 from '../components/ClientSignup/ClientSignupStep2';
import ClientSignupStep3 from '../components/ClientSignup/ClientSignupStep3';
import ClientSignupStep4 from '../components/ClientSignup/ClientSignupStep4';
import ClientSignupStep5 from '../components/ClientSignup/ClientSignupStep5';
import ClientSignupStep6 from '../components/ClientSignup/ClientSignupStep6';

const SignupClient = (props) => {

  const { signupUser } = WithAuth();
  const [step, setStep] = useState(0);
  const [backLink, setBackLink] = useState(null)
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [title, setTitle] = useState('Registro')
  const [clientName, setClientName] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [funnelDone, setFunnelDone] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [show, setShow] = useState(false);

  // Form Data
  const [dataClient, setDataClient] = useState({
    user: {
      username: '',
      password: '',
      isCoach: false,
    },
    client: {
      clientID: '',
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
      photos: [],
    },
  });

  // Carousel
  const [controls, setControls] = useState(false);
  const [touch, setTouch] = useState(false);
  const [interval, setInterval] = useState(null);
  const [activeIndex, setActiveIndex] = useState(step);

  let history = useHistory();
  const totalSteps = 7;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const nextStep = () => {
    console.log('estoy pulsando eh!!')
    console.log('step: ', step);
    if (checkStep(step)) {
      setStep(step + 1)
      console.log('new step: ', step);
      setActiveIndex(step);
      handleBackLink();
    };
  };

  const prevStep = () => {
    if (checkStep(step)){ 
      setStep(step - 1)
      setActiveIndex(step);
      handleBackLink();
    };
  };

  useEffect( ()=> {
    setActiveIndex(step);
  },[setStep])

  const checkStep = (newStep) => {
    if (newStep >= totalSteps) {
      return false;
    }
    return true;
  };

  const handleBackLink = () => {
    return step > 0 ? setBackLink(() => prevStep) : setBackLink(null);
  };

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
      ...data,
    };
    setDataClient(newData);
  };

  const fakeData = {
    user: {
      username: 'ferran10@ferranpuig.com',
      password: '123456',
      isCoach: false,
    },
    client: {
      savePhoto: false,
      name: 'Ferran',
      surname: 'Puig Martínez',
      card: {
        owner: 'Ferran Puig',
        number: 3423423423424234,
        expireAt: '12/2024',
        cvv: 345,
      },
      telephone: '655607113',
      biometrics: {
        age: '40',
        height: '167',
        weight: [40],
        sex: 'male',
      },
      wizard: {
        objective: 'Perder Peso',
        trainningDays: ['Monday', 'Wednesday'],
        availability: {
          min: 9,
          max: 13,
        },
        pack: {
          name: 'XXXXX',
          duration: 12,
          price: 300,
        },
      },
      sexPreference: '',
      adress: '',
      photos: [],
    },
  };

  const registerDBClient = async () => { 
    const data = dataClient; // dataClient || fakeData
    const {client, user} = data;
    const registerUser = signupUser({ user, client });

    if(registerUser) {
      console.log('se ha hecho un usuario')
      handleShow();
    }
  }

  useEffect(() => {
    if(funnelDone){
      registerDBClient()
    }
  }, [funnelDone])
  //props.setFunnelDone(true);
  return (
    <Fragment>
      <div className={`signup-page${isLoading ? ' isLoading' : ''}`}>
        <SubHeader title={title} history={history} action={backLink} />
        <Carousel className={(step > 3 && 'without-dots')} controls={controls} touch={touch} interval={interval} activeIndex={activeIndex}>
          
          <Carousel.Item>
            <ClientSignupStep1 dataClient={dataClient}  nextStep={nextStep} handleData={handleData} step={step}/>
          </Carousel.Item>

          <Carousel.Item>
            <ClientSignupStep2 dataClient={dataClient}  nextStep={nextStep} handleData={handleData} step={step}/>
          </Carousel.Item>

          <Carousel.Item>
            <ClientSignupStep3 dataClient={dataClient} nextStep={nextStep} handleData={handleData} step={step}/>
          </Carousel.Item> 

            <Carousel.Item>
              <ClientSignupStep4 dataClient={dataClient} nextStep={nextStep} handleData={handleData} step={step}/>
            </Carousel.Item>

            <Carousel.Item>
              <ClientSignupStep5 handleTotalAmount={setTotalAmount} name={clientName} dataClient={dataClient} nextStep={nextStep} handleData={handleData} step={step}/>
            </Carousel.Item>

            <Carousel.Item>
              <ClientSignupStep6 setFunnelDone={setFunnelDone} registerDBClient={registerDBClient} totalAmount={totalAmount} dataClient={dataClient} nextStep={nextStep} handleData={handleData} step={step} />
            </Carousel.Item>
            
          </Carousel>
          
      </div>
    </Fragment>
  );
};

export default SignupClient;
