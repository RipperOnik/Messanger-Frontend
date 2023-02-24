import React from 'react'
import { Modal } from 'react-bootstrap'
export default function ContactModal({ contact }) {
    return (
        <>
            <Modal.Header closeButton><span className='fs-2'>{contact.name}</span> </Modal.Header>
            <Modal.Body>
                <div className='small' style={{ color: "grey" }}>{contact.id}</div>
            </Modal.Body>
        </>
    )
}
