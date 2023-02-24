import React, { useRef, useState } from 'react'
import { useContacts } from '../contexts/ContactsProvider'
import { ListGroup, Modal } from 'react-bootstrap'
import ContactModal from './ContactModal'
import "../styles/Contacts.css"


export default function Contacts() {
    const { contacts } = useContacts()
    const [showModal, setShowModal] = useState()
    // const [selectedContactId, setSelectedContactId] = useState()
    const selectedContact = useRef()

    function closeModal() {
        setShowModal(false)
    }

    function handleClick(contact) {
        selectedContact.current = contact
        setShowModal(true)
    }


    return (
        <>
            {contacts.map(contact => {
                return <div className='contact' key={contact.id} onClick={() => handleClick(contact)}>
                    {contact.name}
                </div>
            })}

            <Modal show={showModal} onHide={closeModal}>
                <ContactModal contact={selectedContact.current} />
            </Modal>
        </>

    )
}
