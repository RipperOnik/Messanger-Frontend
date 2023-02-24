import React from 'react'
import { Modal } from 'react-bootstrap'


export default function ConversationTitleModal({ conversation }) {
    const participants = (<>
        <div>Participants</div>
        {conversation.recipients.map(r => {
            return <div className='border p-1'>{r.name}</div>
        })}
    </>)
    const participant = <div className='small' style={{ color: "grey" }}>{conversation.recipients[0].id}</div>
    return (
        <>
            <Modal.Header closeButton><span className='fs-2'>{conversation.name}</span> </Modal.Header>
            <Modal.Body>
                {conversation.recipients.length > 1 ? participants : participant}
            </Modal.Body>
        </>
    )
}
