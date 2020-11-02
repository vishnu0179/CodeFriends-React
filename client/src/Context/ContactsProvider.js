import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import axios from 'axios';


const ContactsContext = React.createContext()

export function useContacts()
{
    return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {

    const [contacts, setContacts] = useLocalStorage('contacts', [])

    async function createContact(id, name) {
        
        const url = 'http://localhost:5001/auth/' + id; 
        const res = await axios.get(url)

        console.log(res);
            setContacts((prevContacts) => {
                return [...prevContacts, { id, name, codeforces: res.data.codeforces }]
            })
        }  
        
    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactsContext.Provider>
    )
}
