import React from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';

export const KvpInputFormWguid = (
  {formTitle,
   fieldData, 
   placeholders, 
   handleFieldChange, 
   onSubmit,
   activeGUID,
   handleActiveGUIDchange
   }) => {

  return(
    <Form>
      <Form.Label className="font-weight-bold">{formTitle}</Form.Label>
      {fieldData.map((kvp, index) => {
        return (
          <div key={index}>
          <Row>
            <Col>
              <Form.Control
                type='text'
                id='key'
                data-index={index}
                value={fieldData['key']}
                onChange={handleFieldChange}
                placeholder={placeholders[index]['key']} />
            </Col>
            <Col>
              <Form.Control
                type='text'
                id='value'
                data-index={index}
                value={fieldData['value']}
                onChange={handleFieldChange}
                placeholder={placeholders[index]['value']} />
            </Col>
          </Row>
          <br/>
        </div>
        )
      })}
      <Row>
        <Form.Control
          type='text'
          id='guid'
          value={activeGUID}
          onChange={(e) => handleActiveGUIDchange(e.target.value)}
          placeholder="GUID"/>
      </Row>
      <br/>
      <Row className="justify-content-md-center">
        <Button onClick={onSubmit}>
          {formTitle}
        </Button>
      </Row>
      <br/>
    </Form>
  )
}