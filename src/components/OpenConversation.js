import React, { useState, useCallback, useRef } from 'react'
import { Form, InputGroup, Button } from "react-bootstrap"
import { useConversations } from '../contexts/ConversationsProvider'
import "../styles/OpenConversation.css"
import { months } from '../resources/date'





export default function OpenConversation() {

    const [text, setText] = useState()
    const { sendMessage, selectedConversation } = useConversations()

    let prevDate = null

    const lastMessageRef = useCallback((node) => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    function handleSubmit() {
        sendMessage(selectedConversation.recipients.map(r => r.id),
            text, new Date().toString(), selectedConversation.conId)
        setText('')
    }
    function handleKeypress(e) {
        if (e.keyCode === 13) {
            e.preventDefault()
            handleSubmit()
        }
    }


    function defineDate(dateStr) {
        const date = new Date(dateStr)
        const curDate = new Date()
        if (date.getFullYear() === curDate.getFullYear()) {
            if (date.getDate() === curDate.getDate() && date.getMonth() === curDate.getMonth()) {
                return "Today"
            }
            return `${date.getDate()} ${months[date.getMonth()]}`
        } else {
            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        }
    }
    function defineTime(date) {
        const hours = date.getHours()
        const minutes = date.getMinutes()
        if (minutes < 10) {
            const minutesStr = `0${minutes}`
            return `${hours}:${minutesStr}`
        } else {
            return `${hours}:${minutes}`
        }
    }



    return (
        <div className='d-flex flex-column flex-grow-1'>
            <div className='flex-grow-1 overflow-auto'>
                <div className='d-flex flex-column align-items-start justify-content-end px-3'>
                    {selectedConversation.messages.map((message, index) => {
                        const isLastMessage = index === selectedConversation.messages.length - 1
                        const messageDate = new Date(message.date)

                        const curDate = { day: messageDate.getDate().toString(), month: messageDate.getMonth().toString(), year: messageDate.getFullYear().toString() }
                        const renderDate = prevDate === null || JSON.stringify(prevDate) !== JSON.stringify(curDate)
                        prevDate = { ...curDate }
                        return (
                            <div ref={isLastMessage ? lastMessageRef : null} className={`w-100 my-1 d-flex flex-column ${message.fromMe ? 'align-items-end' : 'align-items-start'}`} key={index}>
                                {renderDate && <div className='date-separator align-self-center small'>{defineDate(message.date)}</div>}
                                <div className={`d-flex flex-column align-items-start rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    <div>{message.text}</div>
                                    <div className='align-self-end' style={{ fontSize: ".5em" }}>{defineTime(messageDate)}</div>
                                </div>
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
