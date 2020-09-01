import React, { Fragment, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';

function ClientSignupStep4(props) {

  const [disabledButton, setDisabledButton] = useState(true)
  const [objective, setObjective] = useState('')
  const [objectiveSelected, setObjectiveSelected] = useState("")

  
  // Formik
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const stepData = {
      client: {
        ...props.dataClient.client,
        wizard: {
          ...props.dataClient.client.wizard,
          objective
        }
      }
    }

    console.log('stepData: ', stepData)
    console.log('stepData: ', stepData)
    props.handleData(stepData)
    
  }

  const handleCheckBox = (e) => {
    setObjective(e.target.value)
    setObjectiveSelected(e.target.value)
    setDisabledButton(false)
  }

  return (
    <Fragment>
      <h2>4. OBJETIVOS</h2>
      <Form onSubmit={handleSubmit}>

        <div className="form-check button-check">
          <input id="objective1" value="Perder Peso" onChange={(e) => handleCheckBox(e)} checked={objectiveSelected === 'Perder Peso'} value="Perder Peso" type="radio" className="form-check-input"/>
          <label htmlFor="objective1" className="form-check-label"><span class="icon-perder-peso"></span> Perder Peso</label>
        </div>
        <div className="form-check button-check">
          <input id="objective2" onChange={(e) => handleCheckBox(e)} type="radio" className="form-check-input" checked={objectiveSelected === 'Ganar Músculo'} value="Ganar Músculo"/>
          <label htmlFor="objective2" className="form-check-label"><span class="icon-fuerza"></span> Ganar Músculo</label>
        </div>
        <div className="form-check button-check">
          <input id="objective3" onChange={(e) => handleCheckBox(e)} type="radio" className="form-check-input"  checked={objectiveSelected === 'Mantenerse'} value="Mantenerse"/>
          <label htmlFor="objective3" className="form-check-label"><span class="icon-mantenerse"></span> Mantenerse</label>
        </div>
        <Button className="mt-5" disabled={ disabledButton} type="submit" variant="primary" size="lg" onClick={() => props.nextStep()}>Continuar</Button>
      </Form>
    </Fragment>
  )
}

export default ClientSignupStep4
