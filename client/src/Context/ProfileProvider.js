import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'

import { useContacts } from './ContactsProvider'
import useLocalStorage from '../hooks/useLocalStorage';

const ProfileContext = React.createContext();

export function useProfile() {

    return useContext(ProfileContext);
}

export function ProfileProvider({ id, forces, children }) {

    const { contacts } = useContacts();
    //console.log(id);
    const [profileId, selectProfileId] = useState(id);
    const [profileDetail, setProfileDetail] = useState();
    const [contestDetail, setContestDetail] = useState();

    const currentCodeforcesId = contacts.filter((profile) => {
        if (profile.id === profileId) {
            return true;
        }
        return false
    })
    let url = "";
   
    if(profileId === id)
    {
        url = "http://localhost:5001/user/" + forces;
    }
    else if(currentCodeforcesId.length > 0)
    {
        url = "http://localhost:5001/user/" + currentCodeforcesId[0].codeforces;
        //console.log(currentCodeforcesId[0]);
    }
    console.log(url)
    //let profileDetails =  axios.get(url);
    
    // axios.get(url)
    //     .then((res) => {
    //         profileDetails = res.data
    //         console.log(profileDetails);
    //         //setProfileDetail(res.data.result)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })

    useEffect(() => {
        axios.get(url)
        .then((res) => {    
            setProfileDetail(res.data.userDetail)
            console.log("a")
            setContestDetail(res.data.contestHistory)
            console.log(contestDetail)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [profileId])



    //console.log(profileDetail);



    const value = {
        profileId,
        selectProfileId,
        profileDetail,
        contestDetail
    }

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}
