import React, { useState } from 'react'
import Sidebar from './Sidebar'

import OpenConversation from './OpenConversation'

import { useConversation } from '../Context/ConversationProvider'
import ProfileView from './ProfileView';

export default function Dashboard({ id }) {

    const [view, setView] = useState('chat');
    const { selectedConversation } = useConversation();

    const value = {
        id,
        setView
    }
    console.log(id)
    return (
        <div className='d-flex' style={{ height: '100vh' }}>
            <Sidebar id={id} setView= {setView}></Sidebar>
            {view === 'chat' ? selectedConversation && <OpenConversation /> : <ProfileView />}
        </div>
    )
}
