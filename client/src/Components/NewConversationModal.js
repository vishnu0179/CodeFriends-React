import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../Context/ContactsProvider'

import {useConversation} from '../Context/ConversationProvider'

export default function NewConversationModal({closeModal}) {

    const { contacts } = useContacts();
    const {createConversation} = useConversation();

    const [selectedContactIds, setSelectedContactIds] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        
        createConversation(selectedContactIds)

        closeModal();
    }

    function handleCheckBoxChange(contactId) {
        setSelectedContactIds((prevSelected) => {
            if (prevSelected.includes(contactId)) {
                return prevSelected.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSelected, contactId] 
            }

        })
    }


    return (
        <div>
            <Modal.Header closeButton>Start New Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => {
                        return (
                            <Form.Group controlId={contact.id} key={contact.id}>
                                <Form.Check
                                    type='checkbox'
                                    value={selectedContactIds.includes(contact.id)}
                                    label={contact.name}
                                    onChange={() => handleCheckBoxChange(contact.id)}
                                />
                            </Form.Group>
                        )
                    })}
                    <Button type='submit'>Create</Button>
                </Form>
            </Modal.Body>
        </div>
    )
}
