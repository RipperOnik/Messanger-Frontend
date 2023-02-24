import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from "react-bootstrap"
import { useConversations } from '../contexts/ConversationsProvider'
export default function OpenConversation() {

    const [text, setText] = useState()
    const { sendMessage, selectedConversation } = useConversations()
    const lastMessageRef = useCallback((node) => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])







    function handleSubmit() {
        // e.preventDefault()
        sendMessage(selectedConversation.recipients.map(r => r.id),
            text)
        setText('')
    }
    function handleKeypress(e) {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            e.preventDefault()
            handleSubmit()
        }
    }


    return (
        <div className='d-flex flex-column flex-grow-1'>
            <div className='flex-grow-1 overflow-auto'>
                <div className='d-flex flex-column align-items-start justify-content-end px-3'>
                    {selectedConversation.messages.map((message, index) => {
                        const isLastMessage = index === selectedConversation.messages.length - 1
                        return (
                            <div ref={isLastMessage ? lastMessageRef : null} className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`} key={index}>
                                <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>{message.text}</div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>{message.fromMe ? 'You' : message.name}</div>
                            </div>
                        )
                    })}
                </div>

            </div>
            <Form>
                <Form.Group className='m-2'>
                    <InputGroup>
                        <Form.Control as="textarea" required value={text} onChange={e => setText(e.target.value)} style={{ height: "75px" }} onKeyDown={handleKeypress} />
                        <Button onClick={handleSubmit}>Send</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
