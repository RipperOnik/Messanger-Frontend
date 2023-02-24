import React, { useRef, useState } from 'react'
import { Modal, Form, Button } from "react-bootstrap"
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'
import { v4 as uuidV4 } from 'uuid'

export default function NewConversationModal({ closeModal }) {
    const { contacts } = useContacts()
    const { createConversation } = useConversations()
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const nameRef = useRef()
    function handleSubmit(e) {
        e.preventDefault()
        if (selectedContactIds.length === 0) {
            alert("Choose contacts")
            return
        }

        let conversationName
        if (selectedContactIds.length > 1) {
            conversationName = nameRef.current.value
        } else {
            const foundContact = contacts.find(contact => contact.id === selectedContactIds[0])
            conversationName = foundContact.name
        }
        console.log(conversationName)

        createConversation(selectedContactIds, uuidV4(), conversationName)
        closeModal()
    }
    function handleChange(contactId) {
        setSelectedContactIds(prev => {
            if (prev.includes(contactId)) {
                return prev.filter(contact => {
                    return contact !== contactId
                })
            } else {
                return [...prev, contactId]
            }
        })

    }
    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="d-flex gap-3 flex-column">
                    {selectedContactIds.length > 1 &&
                        <Form.Group>
                            <Form.Label>Conversation Name</Form.Label>
                            <Form.Control type='text' required ref={nameRef} />
                        </Form.Group>}

                    {contacts.map((contact) => {
                        return <Form.Group key={contact.id}>
                            <Form.Check type='checkbox' label={contact.name} value={selectedContactIds.includes(contact.id)} onChange={() => handleChange(contact.id)} />
                        </Form.Group>
                    })}
                    <Button type='submit'>Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
