import React, {useState}from 'react';
import {Row, Card, Button, ListGroup} from 'react-bootstrap'
import {API} from 'aws-amplify'
import {KvpInputForm} from '../components/KvpInputForm'
import {KvpInputFormWguid} from '../components/KvpInputFormWguid'
import {BatchEventInput} from '../components/BatchEventInput'
import { BatchUserEventInput } from './BatchUserEventInput';
const batchDataPlaceholders = [
  {"key": "batch_data_key1", "value": "batch_data_value1"},
  {"key": "batch_data_key2", "value": "batch_data_value2"},
  {"key": "batch_data_key3", "value": "batch_data_value3"}
]



export const BatchControlCard = ({
  createBatchData,
  addBatchData,
  handleCreateBatchFieldsChange,
  handleAddBatchDataFieldsChange,
  onCreateBatch, 
  onAddBatchData,
  activeGUID,
  handleActiveGUIDchange
  }) => {

  const [openBatches, setOpenBatches] = useState([])

  const listOpenBatches = async () => {
    try {
      const response = await API.get('hudson-dummy-python-api', '/listOpenBatches')

      console.log(response)
      setOpenBatches(response[1].guids)
    } catch(e) {
      console.log(e)
    }
  }

  return(
    <>
      <Card>
        <Card.Header>
          <Card.Title>Batch Control <b>4.</b></Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <b>1.</b> Operator confirms the proper setup of the run and types any comments.<br/>
            <b>2.</b> Operator initializes a batch run (Create Batch Button)
          </Card.Text>
          <KvpInputForm
            formTitle="Create Batch"
            fieldData={createBatchData}
            placeholders={batchDataPlaceholders}
            handleFieldChange={handleCreateBatchFieldsChange}
            onSubmit={onCreateBatch}/>
          <Row className="justify-content-md-center">
            <Button onClick={listOpenBatches}>List Open Batches</Button>
          </Row>
          <br/>
          {(openBatches.length > 0) ?
          <>
            <Row className="justify-content-md-center"><h5>Batch GUIDs</h5></Row>
            <ListGroup>
              {openBatches.map((guid, index) => {
                return (
                  <Row className="justify-content-md-center" key={index}>
                    <ListGroup.Item>{guid}</ListGroup.Item>
                  </Row>
                )
              })}
            </ListGroup>
            <br/>
          </>
          :
          <>
          </>
          }
          <KvpInputFormWguid 
            formTitle="Add Batch Data"
            fieldData={addBatchData}
            placeholders={batchDataPlaceholders}
            handleFieldChange={handleAddBatchDataFieldsChange}
            onSubmit={onAddBatchData}
            activeGUID={activeGUID}
            handleActiveGUIDchange={handleActiveGUIDchange}/>

          <BatchEventInput/>
          <BatchUserEventInput/>
        </Card.Body>
      </Card>
    </>
  )
}