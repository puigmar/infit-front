import React, { Fragment, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

function ClientSignupStep3(props) {
  const [formCompleted, setFormCompleted] = useState(false);
  const [selectDefaultValue, setSelectDefaultValue] = useState(
    'Escoge una franja horaria'
  );

  // Formik
  const formik = useFormik({
    initialValues: {
      trainningDays: [],
      availability: '',
    },
    validationSchema: Yup.object().shape({
      trainningDays: Yup.number().required('Tienes que escoger una franja horaria')
                                 .oneOf([1,3,5]),
      availability: Yup.string().required('Tienes que escoger una franja horaria'),
    }),
    onSubmit: (values) => {
      console.log('ENTRANDO EN onSUBMIT!');
      const { trainningDays, availability } = values;
      const availabilityRange = availability.split('-');

      const stepData = {
        client: {
          ...props.dataClient.client,
          wizard: {
            ...props.dataClient.client.wizard,
            trainningDays,
            availability: {
              min: Number(availabilityRange[0]),
              max: Number(availabilityRange[1]),
            },
          },
        },
      };
      console.log('stepData: ', stepData);
      props.handleData(stepData);
    },
  });

  const checkFormEmptyFields = () => {
    setFormCompleted(true)
    for(let field in formik.values){
      if(formik.values[field] === '' || Object.keys(formik.errors).length > 0){
        setFormCompleted(false)
      }
    }
  }

  useEffect(() => {
    console.log('formCompleted: ', formCompleted);
    checkFormEmptyFields();
  }, [formik.values, formik.errors]);

  return (
    <Fragment>
      <h2>3. DISPONIBILIDAD</h2>
      <Form onSubmit={formik.handleSubmit} onChange={checkFormEmptyFields}>
        <Form.Group controlId='availability'>
          <Form.Label className="text-center">¿Qué horario prefieres?</Form.Label>
          
          <Form.Group controlId='availability'>
            <Form.Control
              as='select'
              value={selectDefaultValue}
              {...formik.getFieldProps('availability')}
            >
              <option value='Escoge una franja horaria'></option>
              <option value='9-13'>Mañanas, de 9h a 13h</option>
              <option value='14-20'>Tardes, de 14h a 20h</option>
              <option vale='21-23'>Noches de 21h a 23h</option>
            </Form.Control>
          </Form.Group>
        </Form.Group>

        <Form.Group controlId='trainningDays'>
          <Form.Label className="text-center">¿Que día quieres entrenar?</Form.Label>
          <Form.Group controlId='formBasicCheckbox'>
            <Row>
              <Col>
                <Form.Check
                  {...formik.getFieldProps('trainningDays')}
                  type='checkbox'
                  label='Lunes'
                  value='1'
                  id={uuidv4()}
                />
                <Form.Check
                  {...formik.getFieldProps('trainningDays')}
                  type='checkbox'
                  label='Martes'
                  value='2'
                  id={uuidv4()}
                />
                <Form.Check
                  {...formik.getFieldProps('trainningDays')}
                  type='checkbox'
                  label='Miércoles'
                  value='3'
                  id={uuidv4()}
                />
              </Col>
              <Col>
                <Form.Check
                  {...formik.getFieldProps('trainningDays')}
                  type='checkbox'
                  label='Jueves'
                  value='4'
                  id={uuidv4()}
                />
                <Form.Check
                  {...formik.getFieldProps('trainningDays')}
                  type='checkbox'
                  label='Viernes'
                  value='5'
                  id={uuidv4()}
                />
                <Form.Check
                  {...formik.getFieldProps('trainningDays')}
                  type='checkbox'
                  label='Sábado'
                  value='6'
                  id={uuidv4()}
                />
              </Col>
            </Row>
          </Form.Group>
        </Form.Group>
        <Button
          type='submit'
          variant='primary'
          size='lg'
          onClick={() => props.nextStep()}
          disabled={!formCompleted}
          className="mt-4"
        >
          Continuar
        </Button>
      </Form>
    </Fragment>
  );
}

export default ClientSignupStep3;
