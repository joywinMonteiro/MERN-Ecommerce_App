

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'


export const UserContext = createContext({})

// eslint-disable-next-line react/prop-types
export function UserContextProvider({children}){

    const [user, setUser] = useState(null)
    
    useEffect(() => {
        if(!user)
        axios.get('/profile').then(({data}) => {
            setUser(data)
        })
        
    }, [user])
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}




