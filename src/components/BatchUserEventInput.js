import React, {useState} from 'react';
import {Row, Form, Button} from 'react-bootstrap';
import {API} from 'aws-amplify'

export const BatchUserEventInput = () => {
  const [activeGUID, setActiveGUID] = useState("")
  const [message, setMessage] = useState("")

  const addBatchUserEvent = async () => {
    try {
      const params = {
        body: {
          guid         : activeGUID,
          message      : message
        }
      }
      const response = await API.put('hudson-dummy-python-api', '/addBatchUserEvent', params)
      console.log(response)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <Form>
      <Form.Label className="font-weight-bold">Add Batch User Event</Form.Label>
      <Row>
        <Form.Control
          type="text"
          id='activeGUID'
          value={activeGUID}
          onChange={(e)=>setActiveGUID(e.target.value)}
          placeholder="GUID"/>
      </Row>
      <br/>
      <Row>
        <Form.Control
          type="text"
          id='message'
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="message"/>
      </Row>
      <br/>
      <Row className="justify-content-md-center">
        <Button onClick={addBatchUserEvent}>
          Add Batch User Event
        </Button>
      </Row>
    </Form>
  )
}