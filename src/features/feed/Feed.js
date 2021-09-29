import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllCandidates,
  getAllQuestions,
  getAllApplications,
  clearSelection
} from './feedReducerSlice';
// import { Grid, Image } from 'semantic-ui-react'
import { ApplicantCard } from './components/ApplicantCard';
import { QandA } from './components/QandA';
import { Button, Grid, Menu, Container, Divider } from 'semantic-ui-react'
import App from '../../App';


export function Feed() {
  // const candidates = useSelector(allCandidates);
  const dispatch = useDispatch();
  const [tabLocation, setTabLocation] = useState("feed");

  let feed = useSelector((state) => state.feed)
  console.log(useSelector((state) => state.feed));

  if (!Object.keys(feed.applications).length) {
    dispatch(getAllApplications())
    return null
  }
  if (!Object.keys(feed.questions).length) {
    dispatch(getAllQuestions())
    return null
  }
  if (!Object.keys(feed.candidates).length) {
    dispatch(getAllCandidates())
    return null
  }

  let showQandAPage = () => {
    if (!Object.keys(feed.selectedCandidate).length) return null
    return <QandA />
  }

  let changeTab = (tab) => {
    dispatch(clearSelection())
  }

  let showAllCandidates = () => {
    if (!Object.keys(feed.candidates).length) return null
    if (Object.keys(feed.selectedCandidate).length) return null
    let output = feed.candidates.map(candidate => {
      return <ApplicantCard candidate={candidate} />
    })
    return output

  }




  return (

    <Container text>
      <Grid.Row>
        <Menu tabular>
          <Menu.Item
            name='back'
            active={tabLocation === "back"}
            onClick={() => changeTab("back")}
          />
        </Menu>
        {showAllCandidates()}
        {showQandAPage()}
      </Grid.Row>
    </Container>
  )

}
