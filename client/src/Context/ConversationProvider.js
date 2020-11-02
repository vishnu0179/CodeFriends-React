import React, {useContext, useState, useEffect, useCallback} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

import {useContacts} from '../Context/ContactsProvider'
import { useSocket } from './SocketProvider';

const ConversationContext = React.createContext();

export function useConversation()
{
    return useContext(ConversationContext)
}


export function ConversationProvider({id, children}) {
    
    const [conversations, setConversations] = useLocalStorage('conversation', [])
    const [selectConversationIndex, setSelectConversationIndex] = useState(0)

    const socket = useSocket()

    const {contacts} = useContacts();
    function createConversation(recipients){
        setConversations(prevConversations => {
            return [...prevConversations, {recipients, message: []}]
        })
    }

    const  addMessage = useCallback(({recipients, payload, sender, type}) =>
    {
        setConversations(prevConversations => {
            let madeChng = false;
            const newMessage = {type, sender, payload}
            
            const newConversation = prevConversations.map((conversation) => {
                if(arrayEquality(conversation.recipients, recipients))
                {
                    madeChng = true;

                    return {...conversation, message: [...conversation.message, newMessage]}
                }

                return conversation 
            })

            if(madeChng) {
                return newConversation
            } else {
                return [...prevConversations, { recipients, message: [newMessage]}]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if(socket == null) return
        
        socket.on('receive-message', addMessage)

        return () => {
            socket.off('receive-message')
        }
    }, [socket, addMessage])
    
    function sendMessage(recipients, payload, type)
    {
        socket.emit('send-message', {recipients, payload, type})
        addMessage({recipients, payload, sender: id, type})
    }

    console.log(typeof(conversations))

    const formattedConversations = conversations.map((conversation, index) => {
      
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return {id: recipient, name: name}
        })

        const messages = conversation.message.map(m => {
            const contact = contacts.find(contact => {
                return contact.id === m.sender
            })
            
            const name = (contact && contact.name) || m.sender
            const fromMe = id === m.sender

            return {...m, senderName: name, fromMe}
        })

        const selected = index === selectConversationIndex;
        return {...conversation, messages, recipients, selected}
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectConversationIndex],
        sendMessage,
        selectConversationIndex : setSelectConversationIndex, 
        createConversation
    }

    return (
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    )
}

function arrayEquality(a, b)
{
    if(a.length !== b.length)   return false;

    a.sort()
    b.sort();

    return a.every((element, index) => {
        return element === b[index]
    })
}
