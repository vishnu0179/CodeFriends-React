import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../Context/ContactsProvider'
import { useProfile } from '../Context/ProfileProvider';


export default function Profiles({id}) {

    const {contacts} = useContacts();
    const {profileId, selectProfileId} = useProfile()

    console.log(id)
    return (
        <ListGroup variant='flush'>
            <ListGroup.Item 
                key={id}
                active
                onClick={()=> selectProfileId(id)}
                active = {profileId === id}
            >
                Me
            </ListGroup.Item>
            {contacts.map((contact) => {
                return (
                    <ListGroup.Item 
                        key={contact.id}
                        active
                        onClick={()=> selectProfileId(contact.id)}
                        active = {profileId === contact.id}
                    >
                        {contact.name}
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}
