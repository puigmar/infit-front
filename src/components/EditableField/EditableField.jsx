import React, {useState, Fragment} from 'react'
import { Button, Form } from 'react-bootstrap';


function EditableField({key, value, handleUpdateField }) {

  const [editable, setEditable] = useState(false)
  const [fieldValue, setFieldValue] = useState(value)

  const handleInput = (e) => {
    setFieldValue(e.target.value)
  }

  return (
    <div>
      {
        editable ?
        (
          <Fragment>
            <Form.Group controlId="availability">
              <Form.Group controlId="title">
                  <Form.Control
                    type="text"
                    onInput={(e)=>handleInput(e)}
                    className="form-control-edit"
                    value={fieldValue}
                    name={key}
                  />
              </Form.Group>
            </Form.Group>
            <Button type="text" variant="primary" size="lg" onClick={() => handleUpdateField(key, value)}>Guardar</Button>
          </Fragment>
        )
        :
        (value) // falta botón
      }
    </div>
  )
}

export default EditableField
