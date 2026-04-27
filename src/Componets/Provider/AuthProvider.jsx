"use client";
import React, { useState } from 'react';
import { Authcontext } from './Provider';

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setloading] = useState(true);

    const user2 = {
        name: "Emon Hossain"
    }



    const authInfo = {
        user,
        user2,
        loading
    }

    return <Authcontext value={authInfo}> {children} </Authcontext>
};

export default AuthProvider;