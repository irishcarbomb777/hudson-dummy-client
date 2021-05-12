import React, {useState} from "react"
import styled from 'styled-components'
import {Container, Row, Col} from 'react-bootstrap'
import {useKvpFormFields} from "../hooks/useKvpFormFields"
import { SetupCard } from "../components/SetupCard";
import {AddControlTubesCard} from "../components/AddControlTubesCard"
import { AddBatchTubeBarcodesCard } from "../components/AddBatchTubeBarcodesCard"
import { BatchControlCard } from "../components/BatchControlCard";
import axios from 'axios'

const lotFieldsInit = [
  {key: "", value:""},
  {key: "", value: ""},
  {key: "", value: ""}
]




const batchDataKvpInit = [
  {key: "", value: ""},
  {key: "", value: ""},
  {key: "", value: ""}
] 
const systemToken = "f15a729817f03b1cf6a1e4ed9396c72da8e24562"
const userToken = "e2467cd37884b27cd90dae2a35903eef08f56921"
const url = "https://hudson-api-test.mcclellen.net:8000/api/"
export const Home = () => {

  const [lotFields, handleLotFieldsChange] = useKvpFormFields(lotFieldsInit)
  const [createBatchFields, handleCreateBatchFieldsChange] = useKvpFormFields(batchDataKvpInit)
  const [addBatchDataFields, handleAddBatchDataFieldsChange] = useKvpFormFields(batchDataKvpInit)
  const [activeGUID, setActiveGUID] = useState("")
  // const [checked, setChecked] = useState(false);

  // const [controlTubeCodes, handleControlTubeCodesChange] = useFormFields(controlTubeCodesInit)

  const updateLotInfo = async () => {
    try{
      console.log(lotFields)
      const response = await axios.post(url+"update-lot-info/",
        {
          "system_token" : systemToken,
          "user_token"   : userToken,
          "lot_information_kvp" : lotFields 
        })
      console.log(response)
    } catch(e){
      console.log(e)
    }
  }

  const createBatch = async () => {
    try{
      const response = await axios.post(url+"create-batch/",
        {
          "system_token"   : systemToken,
          "user_token"     : userToken,
          "batch_data_kvp" : createBatchFields 
        })
      console.log(response)
    } catch(e){
      console.log(e)
    }
  }

  const addBatchData = async () => {
    console.log(addBatchDataFields)
    console.log(activeGUID)
    try{
      const response = await axios.post(url+"add-batch-data/",
        {
          "system_token"   : systemToken,
          "guid"           : activeGUID,
          "batch_data_kvp" : addBatchDataFields 
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
            <SetupCard
              fieldData={lotFields}
              handleFieldChange={handleLotFieldsChange}
              onSubmit={updateLotInfo} />
            <br/>
            <AddControlTubesCard/>
            <br/>
            <AddBatchTubeBarcodesCard/>
          </Col>

          <Col>
            <BatchControlCard
              createBatchData={createBatchFields}
              handleCreateBatchFieldsChange={handleCreateBatchFieldsChange}
              onCreateBatch={createBatch}
              addBatchData={addBatchDataFields}
              handleAddBatchDataFieldsChange={handleAddBatchDataFieldsChange}
              onAddBatchData={addBatchData}
              activeGUID={activeGUID}
              handleActiveGUIDchange={setActiveGUID}/>
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