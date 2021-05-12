import React, {useState}from 'react';
import {Row, Col, Card, Form, Button, ListGroup} from 'react-bootstrap'
import axios from 'axios'

export const SetupCard = ({onSubmit, handleFieldChange, fieldData}) => {
  
  const [lotInformationKvp, setLotInformationKvp] = useState([]);
  const getLotInfo = async () => {
    const url = "https://hudson-api-test.mcclellen.net:8000/api/"
    try{
      const response = await axios.post(url+"get-lot-info/",
        {
          "system_token" : "f15a729817f03b1cf6a1e4ed9396c72da8e24562"
        })
      console.log(response.data.lot_information_kvp)
      setLotInformationKvp(response.data.lot_information_kvp)
    } catch(e){
      console.log(e)
    }
  }

  return(
    <>
      <Card>
        <Card.Header>
          <Card.Title>Setup Functions</Card.Title>
          <Card.Subtitle>Input Lot ID's etc</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Label className="font-weight-bold">Input Lot Info</Form.Label>
            {fieldData.map((data, index) => {
              return (
                <div key={index}>
                  <Row>
                    <Col>
                      <Form.Control
                        type='text'
                        id='key'
                        data-index={index}
                        value={fieldData['key']}
                        onChange={handleFieldChange}
                        placeholder="some_reagent_lot_id" />
                    </Col>
                    <Col>
                      <Form.Control
                        type='text'
                        id='value'
                        data-index={index}
                        value={fieldData['value']}
                        onChange={handleFieldChange}
                        placeholder="some_value" />                      
                    </Col>
                  </Row>
                  <br/>
                </div>
              )
            })}
            <Row className="justify-content-md-center">
              <Button
                onClick={onSubmit}
              >
                Update
              </Button>
            </Row>
            <br/>
            <Row className="justify-content-md-center">
              <Button
                onClick={getLotInfo}
              >
                Get Lot Info
              </Button>
            </Row>
            <br/>
          </Form>
          {(lotInformationKvp.length > 0) ?
          <>
            <Row>
              <Col><h3>Keys</h3></Col>
              <Col><h3>Values</h3></Col>
            </Row>
            <ListGroup variant="flush">
              {lotInformationKvp.map((kvp, index) => {
                return (
                  <Row key={index}>
                    <Col><ListGroup.Item>{kvp.key}</ListGroup.Item></Col>
                    <Col><ListGroup.Item>{kvp.value}</ListGroup.Item></Col>
                  </Row>
                )
              })}
            </ListGroup>
          </>
            :
            <>
            </>  
          }
        </Card.Body>
      </Card>
    </>
  )


}
