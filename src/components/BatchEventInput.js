import React, {useState} from 'react';
import {Row, Form, Button} from 'react-bootstrap';
import {API} from 'aws-amplify'

export const BatchEventInput = () => {
  const [activeGUID, setActiveGUID] = useState("")
  const [msgType, setMsgType] = useState("")
  const [message, setMessage] = useState("")

  const addBatchEvent = async () => {
    try {
      const params = {
        body: {
          type         : Number(msgType),
          guid         : activeGUID,
          message      : message
        }
      }
      const response = await API.put('hudson-dummy-python-api', '/addBatchEvent', params)
      console.log(response)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <Form>
      <Form.Label className="font-weight-bold">Input Batch Event</Form.Label>
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
      <Row>
        <Form.Control
          type="text"
          id='type'
          value={msgType}
          onChange={(e)=>setMsgType(e.target.value)}
          placeholder="type (1-3)"/>
      </Row>
      <br/>
      <Row className="justify-content-md-center">
        <Button onClick={addBatchEvent}>
          Add Batch Event
        </Button>
      </Row>
    </Form>
  )
}


