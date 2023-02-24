import React from 'react'
import { useConversations } from '../contexts/ConversationsProvider'
import { ListGroup } from "react-bootstrap"

export default function Conversations() {
    const { conversations, selectConversationIndex } = useConversations()
    return (
        <ListGroup variant='flush'>
            {conversations.map((conversation, index) => {
                return <ListGroup.Item key={conversation.conId}
                    action
                    active={conversation.selected}
                    onClick={() => selectConversationIndex(index)}>
                    {/* {conversation.recipients.map(recipient => recipient.name).join(",")} */}
                    {conversation.name}
                </ListGroup.Item>
            })}
        </ListGroup>
    )
}
