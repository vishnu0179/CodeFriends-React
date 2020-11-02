import React, { useState } from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage'
import useAddUserDetails from '../hooks/useAddUserDetails'
import Dashboard from '../Components/Dashboard'

import { ContactsProvider } from '../Context/ContactsProvider'
import { ConversationProvider } from '../Context/ConversationProvider'
import { SocketProvider } from '../Context/SocketProvider'
import { ProfileProvider } from '../Context/ProfileProvider'


function App() {

  const [id, setId] = useLocalStorage('id');
  const [forces, setForces] = useLocalStorage('forces')
  //const [userDetail, setUserDetail] = useAddUserDetails('user')
  console.log(id);
  

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationProvider id={id}>
          <ProfileProvider id={id} forces = {forces}>
            <Dashboard id={id} />
          </ProfileProvider>
        </ConversationProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    id ? dashboard : <Login onIdSubmit={setId}  updateForcesId = {setForces}  />
  );
}

export default App;
