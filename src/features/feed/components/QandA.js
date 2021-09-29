import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   incrementIfOdd,
//   selectCount,
// } from './counterSlice';
// import styles from './Counter.module.css';
import { Player } from 'video-react';
import { Accordion, Icon, Button, Comment, Form, Header } from 'semantic-ui-react'
import { addComments, getAllApplications } from '../feedReducerSlice';


export function QandA() {
  let candidate = useSelector(state => state.feed.selectedCandidate)
  let questions = useSelector(state => state.feed.questions)
  let applications = useSelector(state => state.feed.applications)
  const [activeIndex, setActiveIndex] = useState(0);
  let dispatch = useDispatch();

  let handleClick = (id) => {
    if (activeIndex == id) setActiveIndex(0)
    else {
      setActiveIndex(id)
    }
  }

  let showComments = (comments) => {
    return comments && <Comment>
      <Comment.Content>
        <Comment.Author as='a'>User:</Comment.Author>
        <Comment.Text>{comments}</Comment.Text>
      </Comment.Content>
    </Comment>
  }


  let showAllQuestions = () => {
    let filteredApps = applications.filter(app => app.id == candidate.applicationId)[0]
    console.log(filteredApps);
    let submitComment = (e, index) => {
      console.log(e.target.elements[0]["value"]);
      let application = JSON.parse(JSON.stringify(filteredApps))
      application.videos[index]["comments"] = e.target.elements[0]["value"]
      dispatch(addComments(application))
      dispatch(getAllApplications())
      e.target.elements[0]["value"] = ""
    }
    return filteredApps.videos.map((video, index) => {
      let question = questions.filter(question => question.id == video.questionId)[0]
      return (
        <div>
          <Accordion styled>
            <Accordion.Title
              active={activeIndex === video.questionId}
              index={video.questionId}
              onClick={() => handleClick(video.questionId)}
            >
              <Icon name='dropdown' />
              {question.question}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === video.questionId}>
              <Player
                playsInline
                src={video.src}
              />

              <Comment.Group>
                <Header as='h3' dividing>
                  Comments
                </Header>
                {showComments(video.comments)}
                <Form reply onSubmit={e => submitComment(e, index)}>
                  <Form.TextArea />
                  <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
              </Comment.Group>
            </Accordion.Content>
          </Accordion>
        </div>
      )
    })
  }

  return showAllQuestions()
}