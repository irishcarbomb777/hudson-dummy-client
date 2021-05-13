import React, {useState, useRef}from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { API } from "aws-amplify"
import { s3Upload } from "../libs/awsLib";
import { onError } from '../libs/errorLib';



export const AddBatchTubeDataCard = () => {
  const file = useRef(null);
  const [activeGUID, setActiveGUID] = useState("")

  const handleFileChange = (event) => {
    file.current = event.target.files[0];
    console.log(file.current.name)
  }

  const handleSubmit = async () => {
    const params = {
      body: {
        guid         : activeGUID,
        filename     : file.current.name
      }
    }

    try {
      const attachment = file.current ? await s3Upload(activeGUID, file.current) : null
      console.log(attachment)
      const response = await API.put('hudson-dummy-python-api', '/addBatchTubeData', params)
      console.log(response)
    } catch(e) {
      onError(e)
    }

  }

  return(
    <Card>
      <Card.Header>
        <Card.Title>Add Batch Tube Data</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <b>1.</b> Hudson Software collects all raw data and links this data to batch run info.
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
          <Form.Group>
            <Form.Label><b>Upload Data Zip</b></Form.Label>
            <Form.Control
              onChange={handleFileChange}
              type="file"/>
          </Form.Group>
          <Button onClick={handleSubmit}>
            Add Batch Tube Data
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}