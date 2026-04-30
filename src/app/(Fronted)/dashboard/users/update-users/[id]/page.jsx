import Updateuserpage from '@/Componets/Pages/dashboard/Users/Updateuserpage';
import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { ObjectId } from "mongodb";
import React from 'react';

// ১. ডাইনামিক মেটাডেটা জেনারেট ফাংশন
export async function generateMetadata({ params }) {
    const { id } = await params;

    try {
        const usersCollection = await getUsers();
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });

        if (!user) {
            return { title: "User Not Found | ZapShift" };
        }

        return {
            title: `${user.name} | Update | ZapShift Dashboard`,
            description: `Editing profile for ${user.name} on ZapShift.`,
            robots: { index: false, follow: false },
        };
    } catch (error) {
        return { title: "Update User | ZapShift Dashboard" };
    }
}

// ২. মেইন কম্পোনেন্ট
const UpdateUser = () => {
    return (
        <div>
            <Updateuserpage />
        </div>
    );
};

export default UpdateUser;