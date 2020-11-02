import React, { useState, useEffect } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'

import Conversation from './Conversation.js'
import Contacts from './Contacts.js'
import Profiles from './Profiles'

import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'

const CHAT_KEY = 'chat'
const FRIENDS_KEY = 'friends'
const PROFILE_KEY = 'profile'

export default function Sidebar({ id, setView }) {

    const [activeKey, setActiveKey] = useState(CHAT_KEY)
    const convOpen = activeKey === CHAT_KEY
    //const profOpen = activeKey === PROFILE_KEY

    const [modalOpen, setModalOpen] = useState(false)

    function closeModal() {
        setModalOpen(false);
    }

    useEffect(() => {
        setView(activeKey);
    }, [activeKey])
    
    return (
        <div style={{ width: '300px' }} className='col-sm-3 d-flex flex-column'>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant='tabs' className='justify-content-center'>
                    <Nav.Item>
                        <Nav.Link eventKey={PROFILE_KEY}>Profiles</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CHAT_KEY}>Chats</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={FRIENDS_KEY}>Friends</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={PROFILE_KEY}>
                        <Profiles id={id} />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CHAT_KEY}>
                        <Conversation />
                    </Tab.Pane>
                    <Tab.Pane eventKey={FRIENDS_KEY}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div>
                    Your ID: <span className="border-right border-top">{id}</span>
                </div>
                <Button onClick={() => {
                    setModalOpen(true)
                }}>
                    New {convOpen ? 'Conversation' : 'Contact'}
                </Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {convOpen ?
                    <NewConversationModal closeModal={closeModal} /> :
                    <NewContactModal closeModal={closeModal} />
                }
            </Modal>
        </div>
    )
}
