import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import SubHeader from '../components/SubHeader/SubHeader';
// import { checkExistUSer } from '../services/authenticate/auth-client.service';
// import ClientSignupStep1 from '../components/ClientSignup/ClientSignupStep1';
// import ClientSignupStep2 from '../components/ClientSignup/ClientSignupStep2';
// import ClientSignupStep3 from '../components/ClientSignup/ClientSignupStep3';
// import ClientSignupStep4 from '../components/ClientSignup/ClientSignupStep4';
// import ClientSignupStep5 from '../components/ClientSignup/ClientSignupStep5';
import ClientSignupStep6 from '../components/ClientSignup/ClientSignupStep6';

import { signup as signupService } from '../services/authenticate/auth-client.service';

const SignupClient = (props) => {
  let history = useHistory();

  const totalSteps = 7;

  const [step, setStep] = useState(0);
  const [backLink, setBackLink] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [funnelDone, setFunnelDone] = useState(false);

  // Form Data
  const [dataClient, setDataClient] = useState({
    user: {
      username: '',
      password: '',
      isCoach: false,
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
      photos: [],
    },
  });

  // Carousel
  const [controls, setControls] = useState(false);
  const [touch, setTouch] = useState(false);
  const [interval, setInterval] = useState(null);
  const [activeIndex, setActiveIndex] = useState(step);

  const nextStep = () => {
    if (checkStep(step)) {
      setStep(step + 1)
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
      username: 'ferran@ferranpuig.com',
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

  const registerDBClient = () => {
    //dataClient
    console.log('entrando en registerDBCLient');
    const data = fakeData;
    const { client, user } = data;
    console.log(data);
    const registerUSer = signupService(user, client);
    console.log(registerUSer);
  };

  useEffect(() => {
    registerDBClient();
  }, [funnelDone]);

  return (
    <div className='signup-page'>
      <SubHeader title='registro' history={history} action={backLink} />
      <Carousel
        className={step > 3 && 'without-dots'}
        controls={controls}
        touch={touch}
        interval={interval}
        activeIndex={activeIndex}
      >
        {/* <Carousel.Item>
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
          </Carousel.Item> */}

        <Carousel.Item>
          <ClientSignupStep6
            setFunnelDone={setFunnelDone}
            registerDBClient={registerDBClient}
            totalAmount={totalAmount}
            dataClient={dataClient}
            nextStep={nextStep}
            handleData={handleData}
            step={step}
          />
        </Carousel.Item>
      </Carousel>

      <section className='signupBtn'>
        <p className='mt-3'>
          Already have account? <Link to={'/login'}> Login</Link>
        </p>
      </section>
    </div>
  );
};

export default SignupClient;
