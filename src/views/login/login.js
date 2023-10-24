import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Col, Form} from 'react-bootstrap'
import axios from 'axios'
import "./styles.css"
import { isAuth } from '../../middlewares/ProtectedRoutes'

const Login = () => {
    const [loginData, setLoginData] = useState({})
    const [login, setLogin] = useState(null)

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target

        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, JSON.stringify(loginData), { headers: { "Content-Type": "application/json" } })

            if (response.data.token) {
                localStorage.setItem('loggedInUser',JSON.stringify(response.data.token))
                navigate('/')
            }

            setLogin(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      if(isAuth) {
        navigate('/home')
      }
    }, [])
    
    
    return (
        <>
            <Form onSubmit={onSubmit} className="inputPadding">
                <Col lg="4" className="mx-auto">
                    <h1>Login</h1>
                    <h4>To see this page you must be logged - (Test account: mail: ciao@ciao.it - psw: CiaoCiao) - Or just Subscribe! :-D</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email"
                            placeholder="name@example.com"
                            required
                            onChange={handleInputChange} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            aria-describedby="passwordHelpBlock"
                            required
                            onChange={handleInputChange} 
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                    >Login</Button>
                    <Button 
                        as={Link}
                        to="/newauthor"
                    >Subscribe</Button>
                </Col>
            </Form>
        </>
    )
}

export default Login