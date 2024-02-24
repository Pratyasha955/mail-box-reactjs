import React, { useState, useEffect } from 'react';
import Header from '../Layout/Header';
import Sidebar from '../Layout/sidebar';
import ComposeEmail from '../Layout/ComposeEmail';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const [showCompose, setShowCompose] = useState(false);
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);
    const openCompose = () => {
        setShowCompose(true);
    };

    const closeCompose = () => {
        setShowCompose(false);
    };
    if (!currentUser) {
        return null;
    }
    return (
        <div>
            <Header />
            <div className="container">
                <Sidebar onComposeClick={openCompose} />
                <div>
                {showCompose && <ComposeEmail onClose={closeCompose} />}
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;