import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversation } from '../Context/ConversationProvider'

export default function Conversation() {

    const { conversations, selectConversationIndex } = useConversation()

    return (
        <ListGroup variant="flush">
            {conversations.map((conversation, index) => (
                <ListGroup.Item 
                    key={index}
                    action
                    onClick = {()=> selectConversationIndex(index)}
                    active={conversation.selected}
                >
                    {conversation.recipients.map(r=>{
                        return r.name
                    }).join(', ')}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
