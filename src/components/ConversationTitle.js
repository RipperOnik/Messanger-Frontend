import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ConversationTitleModal from './ConversationTitleModal'

export default function ConversationTitle({ selectedConversation }) {
    const [showModal, setShowModal] = useState(false)
    function openModal() {
        setShowModal(true)
    }
    function closeModal() {
        setShowModal(false)
    }
    return (
        <>
            <div className='d-flex flex-column border p-1' onClick={openModal} style={{ cursor: "pointer" }}>
                <div className='fs-2'>{selectedConversation.name}</div>
                {selectedConversation.recipients.length > 1 && <div className='small' style={{ color: "grey" }}>{selectedConversation.recipients.map(r => r.name).join(", ")}</div>}
            </div>
            <Modal show={showModal} onHide={closeModal}>
                <ConversationTitleModal conversation={selectedConversation} />
            </Modal>
        </>

    )
}
