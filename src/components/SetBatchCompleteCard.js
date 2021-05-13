import React, {useState}from 'react';
import { Card, Form, Row, Button } from 'react-bootstrap';
import { API } from "aws-amplify"
import { onError } from '../libs/errorLib';



export const SetBatchCompleteCard = () => {
  const [activeGUID, setActiveGUID] = useState("")

  
  const handleSubmit = async () => {
    try {
      const params = {
        body: {
          guid : activeGUID
        }
      }
      const response = await API.put('hudson-dummy-python-api', '/setBatchComplete', params)
      console.log(response)
    } catch (e) {
      onError(e)
    }
  }
  return(
    <Card>
      <Card.Header>
        <Card.Title>Set Batch Complete</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <b>1.</b> Hudson Software asks operator to confirm that the batch run is finished.<br/>
          <b>2.</b> Operator confirms the run is finished and writes additonal comments on provided field<br/>
          <b>3.</b> Hudson Software transfers all collected data and linked into the FluroTest software. <br/>
          <b>4.</b> FluroTest Software performs data QC and calculates the result.<br/>
          <a href="https://hudson-api-test.mcclellen.net:8000" target="_blank" rel="noopener noreferrer">Go to FluroTest Dashboard</a>

        </Card.Text>
        <Form>
          <Form.Group>
            <Form.Label><b>Input GUID</b></Form.Label>
            <Form.Control
              type="text"
              id="targetGUID"
              value={activeGUID}
              onChange={(e)=>setActiveGUID(e.target.value)}
              placeholder="Target GUID"/>
          </Form.Group>
          <Row className="justify-content-md-center">
            <Button onClick={handleSubmit}>
              Set Batch as Complete and Calculate
            </Button>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}