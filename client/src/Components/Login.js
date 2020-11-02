import React, { useRef, useState } from 'react'
import { Container, Form, Button, Modal } from 'react-bootstrap'
import axios from 'axios'

export default function Login({ onIdSubmit, updateForcesId }) {

    const loginIdRef = useRef();
    const passRef = useRef();

    const fnameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()

    const [modalOpen, setModalOpen] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        const loginDetails = {
            id : loginIdRef.current.value,
            password: passRef.current.value
        }
        
        axios.post('http://localhost:5001/auth/login', loginDetails)
            .then((res)=>{
                
                if(res.data.status) {
                    onIdSubmit(loginDetails.id);
                    updateForcesId(res.data.forces);
                }
                
            })
    }

    function createNewId() {
        //console.log(idRef.current.value);
        setModalOpen(true)
    }

    function createId(e)
    {
        e.preventDefault()
        const userDetails= {
            fullname: fnameRef.current.value,
            id: emailRef.current.value,
            forces: nameRef.current.value,
            password: passwordRef.current.value
        }
        console.log(userDetails);
        
        axios.post('http://localhost:5001/auth/register', userDetails)
            .then((res) => {
                console.log(res);
                setModalOpen(false)
            })        
        
    }

    return (
        <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
            <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label> Enter your ID: </Form.Label>
                    <Form.Control type="text" ref={loginIdRef} required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label> Enter your password</Form.Label>
                    <Form.Control type="password" ref={passRef} required></Form.Control>
                </Form.Group>
                <Button type="submit" className="mr-2">Login</Button>
                <Button onClick={createNewId} variant="secondary"> Create a new id</Button>
            </Form>
            <Modal show={modalOpen} onHide={() => { setModalOpen(false) }}>
                <Modal.Header closeButton>Enter Details</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createId}>
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control ref={fnameRef} type='text' placeholder='Enter your Name' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Enter email</Form.Label>
                            <Form.Control ref={emailRef} type='email' placeholder='Enter email' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Enter Codeforces username</Form.Label>
                            <Form.Control ref={nameRef} type='text' placeholder='Enter name' />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}
