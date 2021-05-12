import React, {useState}from 'react';
import { Card, Form, Row, Button } from 'react-bootstrap';
import { API } from "aws-amplify"



export const AddBatchTubeBarcodesCard = () => {
  const [activeGUID, setActiveGUID] = useState("")
  const [runCodeId, setRunCodeId] = useState("")
  const [iteration, setIteration] = useState("")

  const addBatchTubeData = async () => {
    const params = {
      body: {
        system_token : "f15a729817f03b1cf6a1e4ed9396c72da8e24562",
        guid : activeGUID,
        run_code_id : runCodeId,
        iteration   : Number(iteration)
      }
    }

    const response = await API.put('hudson-dummy-python-api', '/addBatchTubeBarcodes', params)
    console.log(response)
  }
  return(
    <Card>
      <Card.Header>
        <Card.Title>Add Sample Data</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Label className="font-weight-bold">Sample Data Specs</Form.Label>
          <Row>
            <Form.Control
              type="text"
              id='targetGUID'
              value={activeGUID}
              onChange={(e)=>setActiveGUID(e.target.value)}
              placeholder="Target GUID"/>
          </Row>
          <br/>
          <Row>
            <Form.Control
              type="text"
              id='runCodeID'
              value={runCodeId}
              onChange={(e)=>setRunCodeId(e.target.value)}
              placeholder="Enter Unique Run Code ID (MUST MATCH CONTROL TUBES)"/>
          </Row>
          <br/>
          <Row>
            <Form.Control
              type="text"
              id='iteration'
              value={iteration}
              onChange={(e)=>setIteration(e.target.value)}
              placeholder="Set Iteration # (Registered Patient Samples Limited)"/>
          </Row>
          <Row className="justify-content-md-center">
            <Button onClick={addBatchTubeData}>
              Add Batch Tube Data
            </Button>
          </Row>
          
        </Form>
      </Card.Body>

    </Card>
  )
}