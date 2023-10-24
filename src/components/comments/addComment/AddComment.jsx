import React, { useEffect, useState } from 'react'
import axios from "axios";
import useSession from "../../../hooks/useSession";
import { useParams } from 'react-router-dom';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentComment, setIsLoading, setModify } from '../../../reducers/blogPost';


const AddComment = () => {
    const isLoading = useSelector((state) => state.post.isLoading)
    const modify = useSelector((state) => state.post.modify)
    const currentComment = useSelector((state) => state.post.currentComment)

    const dispatch = useDispatch()

    const [comment, setComment] = useState("")
    const [rate, setRate] = useState(0)

    const {id} = useParams()

    const session = useSession()


    const formData = {
        rate: rate,
        comment: comment,
        postId: id,
        authorId: session.id,
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPost/${id}`,formData)
            console.log("Comment saved correctly:", response.data);
            dispatch(setIsLoading(!isLoading))
          } catch (error) {
            console.log("Error:", error);
          }
    }

    const modifySubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPost/${currentComment.postId}/comment/${currentComment._id}`,currentComment)
            console.log("Comment modified correctly:", response.data);
            dispatch(setModify(false))
            dispatch(setIsLoading(!isLoading))
          } catch (error) {
            console.log("Error:", error);
          }

        
    }

    useEffect(() => {

    }, [modify, isLoading])
    


    if (modify) {
        return (
            <>
                <Form
                    className="mt-5"
                    onSubmit={modifySubmit}
                    >
                    <Col lg="4" className="mx-auto">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Comment</InputGroup.Text>
                            <Form.Control
                            placeholder="Comment"
                            aria-label="Comment"
                            aria-describedby="basic-addon1"
                            value={currentComment.comment}
                            onChange={(e) => dispatch(setCurrentComment({comment: e.target.value}))}
                            min="1"
                            max="5"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Rate</InputGroup.Text>
                            <Form.Control
                            type="number"
                            placeholder="Rate"
                            aria-label="Rate"
                            aria-describedby="basic-addon1"
                            value={currentComment.rate}
                            onChange={(e) => dispatch(setCurrentComment({rate: e.target.value}))}
                            />
                        </InputGroup>
                        <Form.Group className="mt-3">
                            <Button
                                type="submit"
                                variant="dark"
                            >
                                Modify Comment
                            </Button>
                        </Form.Group>
                    </Col>
                </Form>
            </>
      )
    } else {
        return (
            <>
                <Form
                    className="mt-5"
                    onSubmit={handleSubmit}
                    >
                    <Col lg="4" className="mx-auto">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Comment</InputGroup.Text>
                            <Form.Control
                            placeholder="Comment"
                            aria-label="Comment"
                            aria-describedby="basic-addon1"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Rate</InputGroup.Text>
                            <Form.Control
                            type="number"
                            placeholder="Rate"
                            aria-label="Rate"
                            aria-describedby="basic-addon1"
                            value={rate}
                            onChange={(e) => setRate(parseInt(e.target.value))}
                            />
                        </InputGroup>
                        <Form.Group className="mt-3">
                            <Button
                                type="submit"
                                variant="dark"
                            >
                                Add Comment
                            </Button>
                        </Form.Group>
                    </Col>
                </Form>
            </>
      )
    }
    
}

export default AddComment