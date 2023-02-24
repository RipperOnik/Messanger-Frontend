import React, { useRef } from 'react'
import { Container, Form, Button } from "react-bootstrap"
import { v4 as uuidV4 } from 'uuid'

export default function Login({ onIdSubmit }) {
    const idRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()
        onIdSubmit(idRef.current.value)
    }
    function createNewId() {
        onIdSubmit(uuidV4())
    }

    return (
        <Container className='d-flex align-items-center' style={{ height: "100vh" }}>
            <Form className='w-100 d-flex' onSubmit={handleSubmit} style={{ gap: "10px", flexDirection: "column" }}>
                <Form.Group>
                    <Form.Label>Enter your ID</Form.Label>
                    <Form.Control type="text" ref={idRef} required />
                </Form.Group>
                <section className='d-flex' style={{ gap: "10px" }}>
                    <Button type='submit'>Login</Button>
                    <Button variant='secondary' onClick={createNewId}>Create a new ID</Button>
                </section>

            </Form>
        </Container>
    )
}
