"use client";
import useAuth from '@/Componets/utils/Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const Userpage = () => {
    const {user} = useAuth();
    // const {data: users} = useQuery({
    //     queryKey: ['users',user?.email],
    //     queryFn: async () => {
    //         const res = await axios.get("/api/auth/register");
    //         return res.data;
    //     }
    // })
    return (
        <div>
            <h1>Users page  </h1>
        </div>
    );
};

export default Userpage;