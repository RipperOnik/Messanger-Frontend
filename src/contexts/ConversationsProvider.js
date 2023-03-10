import React, { useCallback, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationContext = React.createContext()

export function useConversations() {
    return useContext(ConversationContext)
}

export function ConversationsProvider({ id, children }) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const { contacts } = useContacts()
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)

    const socket = useSocket()

    function createConversation(recipients, conId, name) {
        setConversations(prev => [...prev, { recipients, messages: [], conId, name }])
    }
    const addMessageToConversation = useCallback(({ recipients, text, sender, date, conId, name }) => {
        setConversations(prevConversations => {
            const newMessage = { sender, text, date }
            let madeChange = false
            const newConversations = prevConversations.map(conversation => {
                if (conversation.conId === conId) {
                    madeChange = true
                    return { ...conversation, messages: [...conversation.messages, newMessage] }
                } else {
                    return conversation
                }
            })
            if (madeChange) {
                return newConversations
            } else {
                return [...prevConversations, { recipients, messages: [newMessage], conId, name }]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-message', addMessageToConversation)

        return () => socket.off('receive-message')
    }, [socket, addMessageToConversation])

    function sendMessage(recipients, text, date, conId, name) {
        socket.emit('send-message', { recipients, text, date, conId, name })
        addMessageToConversation({ recipients, text, sender: id, date, conId, name })
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })

        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => contact.id === message.sender)
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return { ...message, name, fromMe }
        })

        const selected = index === selectedConversationIndex
        return { ...conversation, recipients, messages, selected }
    })
    const value = {
        conversations: formattedConversations,
        createConversation,
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        selectedConversation: formattedConversations[selectedConversationIndex]
    }

    return (
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>

    )
}