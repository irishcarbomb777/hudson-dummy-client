import React, {useState}from 'react';
import { Card, Form, Row, Button } from 'react-bootstrap';
import { API } from "aws-amplify"



export const AddControlTubesCard = () => {
  const [controlType, setControlType] = useState("")
  const [runCodeId, setRunCodeId] = useState("")

  const createControlTubes = async () => {
    const params = {
      body: {
        control_type : controlType.toLowerCase(),
        run_code_id    : runCodeId,
      }
    }

    const response = await API.put('hudson-dummy-python-api', '/createControlTubes', params)
    console.log(response)
  }
  return(
    <Card>
      <Card.Header>
        <Card.Title>Add Control Tubes <b>1.</b></Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <b>Operator prepares a batch of positive OR negative controls,
          places controls in a 96-well plate, and scans in the barcodes.</b><br/>
          &emsp; As soon as the controls are prepared the barcodes are scanned and link
          to the LOT ID information. The date and time will correspond to the preparation time.
        </Card.Text>
        <Form>
          <Form.Label className="font-weight-bold">Control Tube Specs</Form.Label>
          <Row>
            <Form.Control
              type="text"
              id='controlType'
              value={controlType}
              onChange={(e)=>setControlType(e.target.value)}
              placeholder="Control Type (P or N)"/>
          </Row>
          <br/>
          <Row>
            <Form.Control
              type="text"
              id='runCodeID'
              value={runCodeId}
              onChange={(e)=>setRunCodeId(e.target.value)}
              placeholder="Enter Unique Run Code ID (Remember This!)"/>
          </Row>
          <br/>
          <Row className="justify-content-md-center">
            <Button onClick={createControlTubes}>
              Create Control Tubes
            </Button>
      </Row>
        </Form>
      </Card.Body>

    </Card>
  )
}