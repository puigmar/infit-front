import React, { Fragment, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import FormCompactField from '../FormCompactField/FormCompactField'
import FormAvatar from '../../components/FormAvatar/FormAvatar';

function ClientSignupStep2(props) {

  const [disabledButton, setDisabledButton] = useState(true)
  const [formCompleted, setFormCompleted] = useState(false)
  const [avatarIsPending, setAvatarIsPending] = useState(true)
  const [avatarUrl, setAvatarUrl] = useState('')

  const formik2 = useFormik({
    initialValues: {
      nameUser: '',
      surname: '',
      telephone: '',
      age: '',
      height: '',
      weight: '',
      sex: '',
    },
    validationSchema: Yup.object().shape({
      nameUser: Yup.string()
      .required("*Debes escribir tu nombre"),
      surname: Yup.string()
      .required("*Debes escribir tus apellidos"),
      weight: Yup.number()
      .required("*Debes escribir tu peso"),
      height: Yup.number()
      .required("*Debes escribir tu altura"),
      age: Yup.number()
      .required("*Debes escribir tu edad"),
      sex: Yup.string()
      .required("Tienes que escoger un sexo"),
      telephone: Yup.number()
      .required("Tienes que facilitarnos un teléfono de contacto"),
    }),
    onSubmit: values => {
      const { age, height, sex, ...rest } = values;
      const stepData = {
        avatarUrl,
        biometric: {
          age,
          height,
          sex
        },
        ...rest
      }
      console.log('stepData: ', stepData)
      props.handleData(stepData)
    }
  });

  const handleAvatarFile = (file) => {
    console.log('file: ', file)
    if(file !== ''){
      setAvatarIsPending(false)
    }
    console.log('Estoy en la foto')
    console.log('avatarIsPending: ', avatarIsPending)
    console.log('formCompleted: ', formCompleted)

    if(avatarIsPending === false && formCompleted === true){
      setDisabledButton(false)
    }

    console.log('disabledButton : ', disabledButton)
  }

  const checkFormEmptyFields = () => {

    setFormCompleted(true)
    for(let field in formik2.values){
      if(formik2.values[field] === ''){
        setFormCompleted(false)
      }
    }
    if(avatarIsPending === false && formCompleted === true){
      setDisabledButton(false)
    }
    
  }
  

  useEffect(() => {
    checkFormEmptyFields()
  }, [formik2.values, props.step])

  const handleFieldClass = (name) => {
    console.log(formik2.errors)
    return ({
      'error': formik2.touched[name] && formik2.errors[name],
      'is-invalid': formik2.touched[name] && formik2.errors[name],
      'is-valid': formik2.touched[name] && !formik2.errors[name],
    })
  }

  return (
    <Fragment>
      <Form onSubmit={formik2.handleSubmit}>

        <FormAvatar handleAvatarFile={handleAvatarFile} fieldName="avatarUrl" setAvatarUrl={setAvatarUrl}/>
        {avatarIsPending ? (<p>Sube una imagen de perfil</p>) : ''}
        {(formik2.touched.avatarUrl && formik2.errors.avatarUrl ) && ( <div className="error-message">{formik2.errors.avatarUrl}</div> )}

        <Form.Group controlId="nameUser">
          <FormCompactField>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nameUser"
              {...formik2.getFieldProps('nameUser')}
              className={handleFieldClass('nameUser')}
            />
          </FormCompactField>
          {(formik2.touched.nameUser && formik2.errors.nameUser ) && ( <div className="error-message">{formik2.errors.nameUser}</div> )}
        </Form.Group>

        <Form.Group controlId="surname">
          <FormCompactField>
            <Form.Label>Apellidos</Form.Label>
            <Form.Control 
              type="text" 
              name="surname" 
              {...formik2.getFieldProps('surname')}
              className={handleFieldClass('surname')}
            />
          </FormCompactField>
          {(formik2.touched.surname && formik2.errors.surname ) && ( <div className="error-message">{formik2.errors.surname}</div> )}
        </Form.Group>

        <Form.Group controlId="weight">
          <FormCompactField>
            <Form.Label>Peso</Form.Label>
            <Form.Control
              pattern="\d*" 
              maxLength="3"
              type="text" 
              name="weight" 
              {...formik2.getFieldProps('weight')}
              value={formik2.values.weight}
              className={handleFieldClass('weight')}
            />
          </FormCompactField>
          {(formik2.touched.weight && formik2.errors.weight ) && ( <div className="error-message">{formik2.errors.weight}</div> )}
        </Form.Group>

        <Form.Group controlId="height">
          <FormCompactField>
            <Form.Label>Altura</Form.Label>
            <Form.Control 
              type="text" 
              pattern="\d*" 
              maxLength="3"
              name="height" 
              {...formik2.getFieldProps('height')}
              value={formik2.values.height}
              className={handleFieldClass('height')}
            />
          </FormCompactField>
          {(formik2.touched.height && formik2.errors.height ) && ( <div className="error-message">{formik2.errors.height}</div> )}
        </Form.Group>

        <Form.Group controlId="age">
          <FormCompactField>
            <Form.Label>Edad</Form.Label>
            <Form.Control 
              type="text"
              pattern="\d*" 
              maxLength="2"
              name="age" 
              {...formik2.getFieldProps('age')}
              value={formik2.values.age}
              className={handleFieldClass('age')}
            />
          </FormCompactField>
          {(formik2.touched.age && formik2.errors.age ) && ( <div className="error-message">{formik2.errors.age}</div> )}
        </Form.Group>

        <Form.Group controlId="telephone">
          <FormCompactField>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control 
              type="number"
              pattern="\d*" 
              name="age" 
              {...formik2.getFieldProps('telephone')}
              value={formik2.values.telephone}
              className={handleFieldClass('telephone')}
            />
          </FormCompactField>
          {(formik2.touched.telephone && formik2.errors.telephone ) && ( <div className="error-message">{formik2.errors.telephone}</div> )}
        </Form.Group>

        <Form.Group controlId="sex">
            <Form.Label>Sexo</Form.Label>
            <Form.Group controlId="sex">
              <Form.Control 
                as="select" 
                name="sex"
                value={formik2.values.sex}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
              >
                <option value="Escoge un sexo"></option>
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
                <option vale="other">Other</option>
              </Form.Control>
            </Form.Group>
          {(formik2.touched.telephone && formik2.errors.telephone ) && ( <div className="error-message">{formik2.errors.telephone}</div> )}
        </Form.Group>
        <Button disabled={ disabledButton } type="submit" variant="primary" size="lg" onClick={() => props.nextStep()}>Continuar</Button>
      </Form>
    </Fragment>
  )
}

export default ClientSignupStep2
