import React, { useState } from 'react'
import { Modal, Form, Button } from "react-bootstrap"
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'
import { v4 as uuidV4 } from 'uuid'

export default function NewConversationModal({ closeModal }) {
    const { contacts } = useContacts()
    const { createConversation } = useConversations()
    const [selectedContactIds, setSelectedContactIds] = useState([])
    function handleSubmit(e) {
        e.preventDefault()
        createConversation(selectedContactIds, uuidV4())
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
