import React, {useState} from "react"
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import {Container, Row, Col, Card, Form, ButtonGroup, ToggleButton} from 'react-bootstrap'
import {useFormFields} from "./hooks/useFormFields"
import axios from 'axios'

const lotFieldsInit = [
  {key: "", value:""},
  {key: "", value: ""},
  {key: "", value: ""}
]

const controlTubeCodesInit = [
  {scan_status: 1, barcode: ""},
  {scan_status: 1, barcode: ""},
  {scan_status: 1, barcode: ""},
  {scan_status: 1, barcose: ""},
  {scan_status: 1, barcode: ""},
  {scan_status: 1, barcode: ""},
]

const controlRadio = [
  {name: 'Negative', value: '1'},
  {name: 'Positive', value: '2'}
]

const batchDataKvp = [
  {key: "", value: ""},
  {key: "", value: ""},
  {key: "", value: ""}
] 
const systemToken = "cbe710a4dc4fab2610361484b00e65c4c9275285"
// const userToken = "90643c401ce6edff2c57b4c804af9ab7566b9520"
const url = "https://hudson-api-test.mcclellen.net:8000/api/"
export const App = () => {

  const [lotFields, handleLotFieldChange] = useFormFields(lotFieldsInit)
  // const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  // const [controlTubeCodes, handleControlTubeCodesChange] = useFormFields(controlTubeCodesInit)

  const get_lot_info = async () => {
    try{
      const response = await axios.post(url+"get-lot-info/",
        {
          "system_token" : systemToken
        })
      console.log(response)
    } catch(e){
      console.log(e)
    }


  }

  return (
    <MainContainer>
      <Container>
        <Row>
          <Title>FluroTest Software Simulation</Title>
        </Row>
        <Row>
          <Col className="justify-content-md-center">
            <Card>
              <Card.Header>
                <Card.Title>Setup Functions</Card.Title>
                <Card.Subtitle>Input Lot ID's etc</Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Label class="font-weight-bold">Input Lot Info</Form.Label>
                  {lotFieldsInit.map((kvp, index) => {
                    return (
                      <div key={index}>
                        <Row>
                          <Col>
                            <Form.Control
                              type='text'
                              id='key'
                              data-index={index}
                              value={lotFields['key']}
                              onChange={handleLotFieldChange}
                              placeholder="some_reagent_lot_id" />
                          </Col>
                          <Col>
                            <Form.Control
                              type='text'
                              id='value'
                              data-index={index}
                              value={lotFields['value']}
                              onChange={handleLotFieldChange}
                              placeholder="some_value" />
                          </Col>
                        </Row>
                        <br/>
                      </div>
                    )
                  })}
                  <Row className="justify-content-md-center">
                    <Button
                      onClick={get_lot_info}
                    >
                      Update
                    </Button>
                  </Row>
                  <br/>
                  <Row className="justify-content-md-center">
                    <Button
                      onClick={get_lot_info}
                    >
                      Get Lot Info
                    </Button>
                  </Row>
                </Form>
                <br/> 
                <Form>
                  <Form.Label class="font-weight-bold">Add Control Tubes</Form.Label>
                    <Row>
                    <ButtonGroup toggle>
                      {controlRadio.map((radio, idx) => (
                        <ToggleButton
                          key={idx}
                          type="radio"
                          variant="secondary"
                          name="radio"
                          value={radio.value}
                          checked={radioValue === radio.value}
                          onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                          {radio.name}
                                      </ToggleButton>
                      ))}
                    </ButtonGroup>

                    </Row>
                    <br/>
                  {controlTubeCodesInit.map((kvp, index) => {
                    return (
                      <div key={index}>
                        <Row>
                          <Col>
                            <Form.Control
                              type='text'
                              id='key'
                              data-index={index}
                              value={lotFields['key']}
                              // onChange={handleLotFieldChange}
                              placeholder="control tube barcode" />
                          </Col>
                        </Row>
                        <br/>
                      </div>
                    )
                  })}
                  <Row className="justify-content-md-center">
                    <Button
                      onClick={get_lot_info}
                    >
                      Send
                    </Button>
                  </Row>
                  <br/>
                </Form>
              </Card.Body>
            </Card>
          </Col>


          <Col>
            <Card>
              <Card.Header><Card.Title>Run Test Functions</Card.Title></Card.Header>
              <Card.Body>
                <Form>
                  <Form.Label class="font-weight-bold">Create Batch</Form.Label>
                  {batchDataKvp.map((kvp, index) => {
                    return (
                      <div key={index}>
                        <Row>
                          <Col>
                            <Form.Control
                              type='text'
                              id='key'
                              data-index={index}
                              value={batchDataKvp['key']}
                              onChange={handleLotFieldChange}
                              placeholder="batch_data_key" />
                          </Col>
                          <Col>
                            <Form.Control
                              type='text'
                              id='value'
                              data-index={index}
                              value={batchDataKvp['value']}
                              onChange={handleLotFieldChange}
                              placeholder="batch_data_value" />
                          </Col>
                        </Row>
                        <br/>
                      </div>
                    )
                  })}
                  <Row className="justify-content-md-center">
                    <Button
                      onClick={get_lot_info}
                    >
                      Create Batch
                    </Button>
                  </Row>
                  <br/>
                </Form>
                <Form>
                  <Form.Label class="font-weight-bold">Add Batch Data</Form.Label>
                  {batchDataKvp.map((kvp, index) => {
                    return (
                      <div key={index}>
                        <Row>
                          <Col>
                            <Form.Control
                              type='text'
                              id='key'
                              data-index={index}
                              value={batchDataKvp['key']}
                              onChange={handleLotFieldChange}
                              placeholder="batch_data_key" />
                          </Col>
                          <Col>
                            <Form.Control
                              type='text'
                              id='value'
                              data-index={index}
                              value={batchDataKvp['value']}
                              onChange={handleLotFieldChange}
                              placeholder="batch_data_value" />
                          </Col>
                        </Row>
                        <br/>
                      </div>
                    )
                  })}
                  <Row className="justify-content-md-center">
                    <Button
                      onClick={get_lot_info}
                    >
                      Add Data
                    </Button>
                  </Row>
                  <br/>
                </Form>
                <Form>
                  <Row>
                    <Form.Label class="font-weight-bold">Add Batch Event</Form.Label>
                  </Row>
                  <Row>
                  <Form.Label>This represents an error code thrown by the machine</Form.Label>
                  </Row>
                        <Row>
                          <Col>
                            <Form.Control
                              type='text'
                              id='key'
                              value={batchDataKvp['key']}
                              // onChange={handleLotFieldChange}
                              placeholder="error code #" />
                          </Col>
                          <Col>
                            <Form.Control
                              type='text'
                              id='value'
                              value={batchDataKvp['value']}
                              // onChange={handleLotFieldChange}
                              placeholder="error message" />
                          </Col>
                        </Row>
                        <br/>
                  <Row className="justify-content-md-center">
                    <Button
                      onClick={get_lot_info}
                    >
                      Throw Error
                    </Button>
                  </Row>
                  <br/>
                </Form>


              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainContainer>
  );
}


const Title = styled.p`
  font-weight: 700;
  font-size: 36px;
  text-align: left;
`

const MainContainer = styled.div`
  padding: 100px 50px 50px 50px;
`

