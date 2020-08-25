import React, { Fragment, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import FormCompactField from '../FormCompactField/FormCompactField';
import FormAvatar from '../../components/FormAvatar/FormAvatar';

function ClientSignupStep2(props) {
  const [disabledButton, setDisabledButton] = useState(true);
  const [avatarIsPending, setAvatarIsPending] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [formCompleted, setFormCompleted] = useState(false);

  // Formik
  const formik = useFormik({
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
      nameUser: Yup.string().required('*Debes escribir tu nombre'),
      surname: Yup.string().required('*Debes escribir tus apellidos'),
      weight: Yup.string().required('*Debes escribir tu peso'),
      height: Yup.string().required('*Debes escribir tu altura'),
      age: Yup.string().required('*Debes escribir tu edad'),
      sex: Yup.string()
        .oneOf(['male', 'female', 'other'])
        .required('Tienes que escoger un sexo'),
      telephone: Yup.number().required(
        'Tienes que facilitarnos un teléfono de contacto'
      ),
    }),
    onSubmit: (values) => {
      const { nameUser, age, height, sex, weight, ...rest } = values;
      const stepData = {
        client: {
          ...props.dataClient.client,
          name: nameUser,
          ...rest,
          avatarUrl,
          biometrics: {
            age,
            height,
            weight,
            sex,
          },
        },
      };
      console.log('stepData: ', stepData);
      props.handleData(stepData);
    },
  });

  const handleAvatarFile = (file) => {
    console.log('file: ', typeof file);
    if (file !== '') {
      setAvatarIsPending(false);
    }
  };

  const checkFormEmptyFields = () => {
    setFormCompleted(true);
    for (let field in formik.values) {
      if (formik.values[field] === '') {
        setFormCompleted(false);
      }
    }
    if (avatarIsPending === false && formCompleted === true) {
      setDisabledButton(false);
    }
  };

  useEffect(() => {
    checkFormEmptyFields();
  }, [formik.values, avatarIsPending]);

  const handleFieldClass = (name) => {
    return {
      error: formik.touched[name] && formik.errors[name],
      'is-invalid': formik.touched[name] && formik.errors[name],
      'is-valid': formik.touched[name] && !formik.errors[name],
    };
  };

  return (
    <Fragment>
      <h2>2. DATOS DE TU PERFIL</h2>
      <Form onSubmit={formik.handleSubmit} onChange={checkFormEmptyFields}>
        <FormAvatar
          handleAvatarFile={handleAvatarFile}
          fieldName='avatarUrl'
          setAvatarUrl={setAvatarUrl}
        />
        {avatarIsPending ? <p>Sube una imagen de perfil</p> : ''}
        {formik.touched.avatarUrl && formik.errors.avatarUrl && (
          <div className='error-message'>{formik.errors.avatarUrl}</div>
        )}

        <Form.Group controlId='nameUser'>
          <FormCompactField>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              {...formik.getFieldProps('nameUser')}
              className={handleFieldClass('nameUser')}
            />
          </FormCompactField>
          {formik.touched.nameUser && formik.errors.nameUser && (
            <div className='error-message'>{formik.errors.nameUser}</div>
          )}
        </Form.Group>

        <Form.Group controlId='surname'>
          <FormCompactField>
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type='text'
              {...formik.getFieldProps('surname')}
              className={handleFieldClass('surname')}
            />
          </FormCompactField>
          {formik.touched.surname && formik.errors.surname && (
            <div className='error-message'>{formik.errors.surname}</div>
          )}
        </Form.Group>

        <Form.Group controlId='weight'>
          <FormCompactField>
            <Form.Label>Peso</Form.Label>
            <Form.Control
              {...formik.getFieldProps('weight')}
              pattern='\d*'
              maxLength='3'
              type='text'
              value={formik.values.weight}
              className={handleFieldClass('weight')}
            />
          </FormCompactField>
          {formik.touched.weight && formik.errors.weight && (
            <div className='error-message'>{formik.errors.weight}</div>
          )}
        </Form.Group>

        <Form.Group controlId='height'>
          <FormCompactField>
            <Form.Label>Altura</Form.Label>
            <Form.Control
              type='text'
              pattern='\d*'
              maxLength='3'
              name='height'
              {...formik.getFieldProps('height')}
              value={formik.values.height}
              className={handleFieldClass('height')}
            />
          </FormCompactField>
          {formik.touched.height && formik.errors.height && (
            <div className='error-message'>{formik.errors.height}</div>
          )}
        </Form.Group>

        <Form.Group controlId='age'>
          <FormCompactField>
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type='text'
              pattern='\d*'
              maxLength='2'
              name='age'
              {...formik.getFieldProps('age')}
              value={formik.values.age}
              className={handleFieldClass('age')}
            />
          </FormCompactField>
          {formik.touched.age && formik.errors.age && (
            <div className='error-message'>{formik.errors.age}</div>
          )}
        </Form.Group>

        <Form.Group controlId='telephone'>
          <FormCompactField>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type='number'
              pattern='\d*'
              name='age'
              {...formik.getFieldProps('telephone')}
              value={formik.values.telephone}
              className={handleFieldClass('telephone')}
            />
          </FormCompactField>
          {formik.touched.telephone && formik.errors.telephone && (
            <div className='error-message'>{formik.errors.telephone}</div>
          )}
        </Form.Group>

        <Form.Group controlId='sex'>
          <Form.Label>Sexo</Form.Label>
          <Form.Group controlId='sex'>
            <Form.Control
              as='select'
              value='Escoge un sexo'
              {...formik.getFieldProps('sex')}
            >
              <option value='Escoge un sexo'></option>
              <option value='male'>Hombre</option>
              <option value='female'>Mujer</option>
              <option vale='other'>Other</option>
            </Form.Control>
          </Form.Group>
          {formik.touched.telephone && formik.errors.telephone && (
            <div className='error-message'>{formik.errors.telephone}</div>
          )}
        </Form.Group>
        <Button
          disabled={disabledButton}
          type='submit'
          variant='primary'
          size='lg'
          onClick={() => props.nextStep()}
        >
          Continuar
        </Button>
      </Form>
    </Fragment>
  );
}

export default ClientSignupStep2;
