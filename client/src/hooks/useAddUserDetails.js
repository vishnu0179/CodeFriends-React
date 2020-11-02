import React, { useState, useEffect } from 'react';

const PREFIX = 'chat-app-'

export default function useAddUserDetails(key) {

    const prefixedKey = PREFIX + key;
    const [userDetail, setUserDetail] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if(jsonValue)
        {
            return JSON.parse(jsonValue);
        }
        else {
            return "";
        }
    }) 

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(userDetail))
        
        console.log(userDetail)
        const id = userDetail.id;
        localStorage.setItem("chat-app-id", JSON.stringify(id))
    }, [prefixedKey, userDetail])


    return [userDetail, setUserDetail]
}
