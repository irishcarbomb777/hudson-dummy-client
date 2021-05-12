import React, {useState} from 'react';
import {Row, Form, Button} from 'react-bootstrap';
import axios from 'axios'

export const BatchUserEventInput = () => {
  const [activeGUID, setActiveGUID] = useState("")
  const [message, setMessage] = useState("")

  const addBatchUserEvent = async () => {
    const url = "https://hudson-api-test.mcclellen.net:8000/api/"
    try {
      const response = await axios.post(url+"add-batch-user-event/",
      {
        "system_token" : "f15a729817f03b1cf6a1e4ed9396c72da8e24562",
        "user_token"   : "e2467cd37884b27cd90dae2a35903eef08f56921",
        "guid"         : activeGUID,
        "message"      : message
      })
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