import React, {useState}from 'react';
import { Card, Form, Row, Button } from 'react-bootstrap';
import { API } from "aws-amplify"



export const AddControlTubesCard = () => {
  const [controlType, setControlType] = useState("")
  const [runCodeId, setRunCodeId] = useState("")

  const createControlTubes = async () => {
    const params = {
      body: {
        system_token : "f15a729817f03b1cf6a1e4ed9396c72da8e24562",
        user_token   : "e2467cd37884b27cd90dae2a35903eef08f56921",
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
        <Card.Title>Add Control Tubes</Card.Title>
      </Card.Header>
      <Card.Body>
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