import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from "react-bootstrap"
import Contacts from './Contacts'
import Conversations from './Conversations'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'

const CONVERSATIONS_KEY = "conversations"
const CONTACTS_KEY = "contacts"

export default function Sidebar({ id }) {
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const conversationOpen = activeKey === CONVERSATIONS_KEY
    const [modalOpen, setModalOpen] = useState(false)

    function closeModal() {
        setModalOpen(false)
    }
    function openModal() {
        setModalOpen(true)
    }

    return (
        <div style={{ width: "300px" }} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant='tabs' className='justify-content-center'>
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="overflow-auto flex-grow-1" style={{ borderRight: "1px solid #dee2e6" }}>
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className='p-2 small' style={{ border: "1px solid #dee2e6" }}>
                    Your ID: <span className='text-muted'>{id}</span>
                </div>
                <Button className='rounded-0' onClick={openModal}>
                    New {conversationOpen ? "conversation" : "contact"}
                </Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {conversationOpen ?
                    <NewConversationModal closeModal={closeModal} />
                    :
                    <NewContactModal closeModal={closeModal} />}
            </Modal>

        </div>
    )
}
