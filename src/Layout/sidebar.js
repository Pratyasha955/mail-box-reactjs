import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';

const Sidebar = ({ onComposeClick }) => {
    const handleComposeClick = () => {
        onComposeClick();
      };
    return (
        <div className="sidebar">
            <button onClick={handleComposeClick} className="compose-button">
                <FontAwesomeIcon icon={faEdit} className="icon" />
                Compose
            </button>
        </div>
    );
};

export default Sidebar;