import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllCandidates,
  getAllQuestions,
  getAllApplications,
  setSelectedCandidate
} from '../feedReducerSlice';
import { Button, Card, Image } from 'semantic-ui-react'

export function ApplicantCard({ candidate }) {
  console.log({ candidate });
  const dispatch = useDispatch();


  let showButton = () => {
    if (!!candidate.applicationId) {
      return <Button basic color='green' onClick={()=>dispatch(setSelectedCandidate(candidate))}>
        View Q&A
      </Button>
    }
  }

  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header>{candidate.name}</Card.Header>
          <Card.Description>Candidate # {candidate.id}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            {showButton()}
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  )

}