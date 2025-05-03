import React from 'react';
import { useUser } from '@clerk/nextjs'
import Header from '@/app/components/Header';
import "../app/globals.css";

const ChatPage: React.FC = () => {

    const {user, isSignedIn, isLoaded} = useUser();

    if (!isLoaded) return <div>
        <Header />
        Loading...</div>
    if (!isSignedIn) return <div>
        <Header />
        Please sign in</div>

    return (
        <div>
            <Header />
            <p>Welcome , {user.fullName}!</p>
        </div>
    );
};

export default ChatPage;