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
        <Card.Title>Scan in Patient Tubes</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <b>1.</b> Operator selects a rack of samples (max 90 samples/rack) and places
          3(+) and 3(-) controls, previously prepared and scanned on the specified locations<br/>
          <b>2.</b> Operator places the sample rack in the corresponsing platform location<br/>
          <b>3.</b> Hudson software confirms the reading of all barcodes and the presence of 3(+)
          and 3(-) controls.

        </Card.Text>
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
          <br/>
          <Row className="justify-content-md-center">
            <Button onClick={addBatchTubeData}>
              Add Batch Patient Barcodes
            </Button>
          </Row>
          
        </Form>
      </Card.Body>

    </Card>
  )
}