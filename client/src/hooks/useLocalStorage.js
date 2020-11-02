import {useEffect, useState} from 'react'
import axios from 'axios'
const PREFIX = 'chat-app-'

export default function useLocalStorage(key, initialValue) {
    
    const prefixedKey = PREFIX + key;
    console.log(prefixedKey);
    
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)

        if(jsonValue)   return JSON.parse(jsonValue); 
        else {
            // if(key === 'forces')
            // {
            //     const idString = localStorage.getItem(PREFIX + 'id');
            //     const id = JSON.parse(idString);
            //     const url = 'http://localhost:5001/auth/' + id; 
            //     const res = axios.get(url)

            //     return res.data.codeforces;
            // }
            return initialValue;
        }
    })

    useEffect(()=> {
        console.log('useEffect');
        
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue];

}


