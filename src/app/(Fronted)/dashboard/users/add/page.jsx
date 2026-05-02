import NewUsers from '@/Componets/Pages/dashboard/Users/NewUsers';
import React from 'react';

// SEO মেটাডেটা যোগ করা হলো
export const metadata = {
  title: "Add New User | ZapShift Dashboard",
  description: "Invite and onboard new team members to ZapShift logistics management system.",
  robots: {
    index: false, // যেহেতু এটি ড্যাশবোর্ড পেজ, তাই সার্চ ইঞ্জিন থেকে হাইড রাখা ভালো
    follow: false,
  },
};

const AddUser = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <NewUsers/>
        </div>
    );
};

export default AddUser;