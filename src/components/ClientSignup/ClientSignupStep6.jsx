import React, { Fragment, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormCompactField from '../FormCompactField/FormCompactField' 
import { Form, Button, Accordion, Card, Row, Col } from 'react-bootstrap';
import { PayPalButton } from "react-paypal-button-v2";

function ClientSignupStep6(props) {

  const [disabledButton, setDisabledButton] = useState(true)
  const [formCompleted, setFormCompleted] = useState(false)

  // Formik
  const formik = useFormik({
    initialValues: {
      owner: '',
      number: '',
      expireAt: '',
      cvv: ''
    },
    validationSchema: Yup.object().shape({
      owner: Yup.string()
      .required("*Debes escribir tu nombre"),
      number: Yup.number()
      .required("*Este campo no puede estar vacío"),
      expireAt: Yup.string()
      .required("*Este campo no puede estar vacío"),
      cvv: Yup.number()
      .required("*Este campo no puede estar vacío")
    }),
    onSubmit: (values) => {
      const { owner, number, expireAt, cvv } = values;
      const stepData = {
        client: {
          ...props.dataClient.client,
          card: {
            owner,
            number,
            expireAt,
            cvv
          }
        }
      }
      props.handleData(stepData);
      props.setIsLoading(true)
      setTimeout(()=> {
        props.setIsLoading(false)
        handleRegister()
      }, 3000)
      
    }
  });

  const checkFormEmptyFields = () => {
    console.log(formik.errors)
    setFormCompleted(true)
    for(let field in formik.values){
      if(formik.values[field] === ''){
        setFormCompleted(false)
      }
    }
    if(formCompleted === true){
      setDisabledButton(false)
    }
  }

  useEffect( ()=> {
    checkFormEmptyFields()
  }, [formik.values])

  // paypal method
  const paymentHandler = async (details, data) => {
    handleRegister()
  }

  const handleFieldClass = (name) => {
    return ({
      'error': formik.touched[name] && formik.errors[name],
      'is-invalid': formik.touched[name] && formik.errors[name],
      'is-valid': formik.touched[name] && !formik.errors[name],
    })
  }

  const handleRegister = () => {
    props.registerDBClient()
  }
  

  return (
    <Fragment>
      <h2>Datos bancarios</h2>
      <p className="signup-page_paymentResume">
        <span>Total a pagar:</span>
        <span>{props.totalAmount}€</span>  
      </p>
      <h3 className="h5 text-center mb-3">Escoge tu método de pago</h3>
      <PayPalButton 
          amount={props.totalAmount}
          currency= {'USD'}
          onSuccess={paymentHandler}
          options={{
            clientId: 'AYtz3rCFFUx95tncJNFkn3Fp0C6XJdHXJ23eGL-DgF6faQdSmuXerQDLfpavWJqFJBXXCa3t1GGIMK88',
          }}
        />
          
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
          <span className="icon-card"></span> <span>Targeta de crédito</span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="owner">
                <FormCompactField>
                  <Form.Label>¿Eres el titular? Dinos tu nombre</Form.Label>
                  <Form.Control
                    type="text"
                    {...formik.getFieldProps('owner')}
                    className={handleFieldClass('owner')}
                  />
                  {(formik.touched.owner && formik.errors.owner ) && ( <div className="error-message">{formik.errors.owner}</div> )}
                </FormCompactField>
              </Form.Group>

              <Form.Group controlId="number">
                <FormCompactField>
                  <Form.Label>¿Qué número aparece en tu tarjeta?</Form.Label>
                  <Form.Control
                    type="number"
                    {...formik.getFieldProps('number')}
                    className={handleFieldClass('number')}
                  />
                  {(formik.touched.number && formik.errors.number ) && ( <div className="error-message">{formik.errors.number}</div> )}
                </FormCompactField>
              </Form.Group>
              
              <Row>
                <Col sm="7">
                  <Form.Group controlId="expireAt">
                    <FormCompactField>
                      <Form.Label>¿Cuándo caduca?</Form.Label>
                      <Form.Control
                        type="text"
                        {...formik.getFieldProps('expireAt')}
                        className={handleFieldClass('expireAt')}
                      />
                      {(formik.touched.expireAt && formik.errors.expireAt ) && ( <div className="error-message">{formik.errors.expireAt}</div> )}
                    </FormCompactField>
                  </Form.Group>
                </Col>
                <Col sm="5">
                  <Form.Group controlId="cvv">
                    <FormCompactField>
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="\d*" 
                        maxLength="3"
                        {...formik.getFieldProps('cvv')}
                        className={handleFieldClass('cvv')}
                      />
                      {(formik.touched.cvv && formik.errors.cvv ) && ( <div className="error-message">{formik.errors.cvv}</div> )}
                    </FormCompactField>
                  </Form.Group>
                </Col>
              </Row>
            
              <Button id="paymentButton" disabled={ disabledButton} type="submit" variant="primary" size="lg" >
                Pagar
              </Button>
            
            </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      
    </Fragment>
  )
}

export default ClientSignupStep6
