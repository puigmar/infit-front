import React, { Fragment, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import packs from '../../config/packs';

function ClientSignupStep5(props) {

  const [packList, setPackList] = useState([])
  const [disabledButton, setDisabledButton] = useState(true)
  const [pack, setPack] = useState({})
  const [packSelected, setPackSelected] = useState("")

  useEffect(() => {
    setPackList(packs)
  }, [])
  
  // Formik
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const stepData = {
      client: {
        ...props.dataClient.client,
        wizard: {
          ...props.dataClient.client.wizard,
          pack: {
            id: pack.id,
            name: pack.name,
            duration: pack.duration,
            price: pack.price,
          }
        }
      }
    }

    console.log('stepData: ', stepData)
    props.handleData(stepData)
    
  }

  const handleCheckBox = (e) => {
    let selectedPackId = e.currentTarget.parentNode.id
    const selected = packList.filter(pack => pack.id == selectedPackId)
    setPack(selected[0])
    setPackSelected(selectedPackId)
    setDisabledButton(false)
    props.handleTotalAmount(selected[0].price)
  }

  return (
    <Fragment>
      <h2>¡{props.name} ya casi eres un inFiter!</h2>
      <p>Escoge conque pack te gustaría empezar a ponerte en forma</p>
      <Form onSubmit={handleSubmit}>
        {
          packList.map( pack => {
            return (
              <div id={pack.id} key={pack.id} className="form-check pack-check">
                <input id={`pack${pack.id}`} value={pack.name} onChange={(e) => handleCheckBox(e)} checked={packSelected == pack.id} value={pack.name} type="radio" className="form-check-input"/>
                <label htmlFor={`pack${pack.id}`} className="form-check-label">
                    <h3 className="pack-check_name">{pack.name}</h3>
                    <div id={`pack${pack.id}_duration`} className="pack-check_duration">{`${pack.duration} días`}</div>
                    <div className="pack-check_price"><span id={`pack${pack.id}_price`}>{pack.price}</span>€</div>
                </label>
              </div>
            )
          })
        }
        <Button disabled={ disabledButton} type="submit" variant="primary" size="lg" onClick={() => props.nextStep()}>Continuar</Button>
      </Form>
    </Fragment>
  )
}

export default ClientSignupStep5
