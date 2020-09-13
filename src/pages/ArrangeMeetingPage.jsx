import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import { getTokenUser } from '../helpers/authHelpers.js';
import { getUserInfo } from '../services/user/user.service'

import SubHeader from '../components/SubHeader/SubHeader';
import WebCam from '../components/WebCam/WebCam.jsx';


const ArrangeMeetingPage = (props) => {

  let history = useHistory()

  const [ user, setUser ] = useState(getTokenUser());
  const [ userInfo, setUserInfo ] = useState({})
  const [value, onChange] = useState(new Date());


  useEffect(() => {
    //const { match: { params } } = this.props;
    console.log(props)
  }, [])

  const handleUserInfo = async (userID) => {
    const getUSer = await getUserInfo(userID)
    setUserInfo(getUSer);
  }

  useEffect(() => {
    handleUserInfo(user._id);
  }, [user])

  return (
    <div className="meeetingConfirmation-page">
      <SubHeader title={'Confirmación de servicio'} history={history} />
      <WebCam />
      <div className="resume-program box-layout">
        <h2>DATOS DE TU ENTRENAMIENTO</h2>
        <section className="resume-program_details">
          <dl>
            <dt>Duración</dt>
            <dd>{}</dd>
          </dl>
          <dl>
            <dt>Sesiones semanales</dt>
            <dd>{}</dd>
          </dl>
          <dl>
            <dt>Objetivos</dt>
            <dd>{}</dd>
          </dl>
        </section>
        <section className="resume-program_initialDay">
          <Calendar
            onChange={onChange}
            value={value}
          />
        </section>

      </div>
    </div>
  )
}

export default ArrangeMeetingPage;
