import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {nanoid} from 'nanoid'
import useSession from '../../../hooks/useSession'
import BlogAuthor from '../../blog/blog-author/BlogAuthor'
import { setCurrentComment, setIsLoading, setModify } from '../../../reducers/blogPost'
import { useDispatch, useSelector } from 'react-redux'

const CommentsList = () => {

   const isLoading = useSelector((state) => state.post.isLoading)
   const currentComment = useSelector((state) => state.post.currentComment)

   const dispatch = useDispatch()

    const {id} = useParams()

    const session = useSession()

    const [comments, setComments] = useState([])

    const getCommentsPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPost/${id}/comments`)
        setComments(response.data.comments)
        //console.log(response.data.comments);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      getCommentsPost()
    }, [isLoading])

    const deleteComment = async (commentId) => {

      //console.log(commentId);
      try {
        await axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPost/${id}/comment/${commentId}`)
        console.log("Comment deleted succesfully");
        dispatch(setIsLoading(!isLoading))
      } catch (error) {
        console.log(error);
      }
    }

    const modifyComment = (comment) => {
      dispatch(setCurrentComment(comment))
      console.log(comment);
      dispatch(setModify(true))
    }
    
  
    return (
      <>
        <Container className="mt-5">
          <Row>
              {comments && comments?.map((comment) => {
                if(session.id === comment.authorId._id) {
                  return (
                    <Col lg="4" className="mx-auto" key={nanoid()}>
                      <Card className="mt-3">
                        <Card.Header>
                            <Row>
                            <BlogAuthor {...comment.authorId} />
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Rate: {comment.rate}</Card.Title>
                            <Card.Text>
                                  {comment.comment}
                            </Card.Text>
                            <Button variant="danger" onClick={() => deleteComment(comment._id)}>Delete Comment</Button>
                            <Button variant="warning" onClick={() => modifyComment(comment)}>Modify Comment</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                } else {
                  return (
                    <Col lg="4" className="mx-auto" key={nanoid()}>
                        <Card className="mt-3">
                          <Card.Header>
                              <Row>
                              <BlogAuthor {...comment.authorId} />
                              </Row>
                          </Card.Header>
                          <Card.Body>
                              <Card.Title>Rate: {comment.rate}</Card.Title>
                              <Card.Text>
                                  {comment.comment}
                              </Card.Text>
                          </Card.Body>
                        </Card>
                    </Col>
                  )
                }
              })}
          </Row>
        </Container>
      </>
    );
};

export default CommentsList