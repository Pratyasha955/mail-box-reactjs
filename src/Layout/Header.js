import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { useDispatch } from 'react-redux';
import { logout } from '../Reducer/authSlice';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      dispatch(logout());
      navigate('/');
    };

    return (
        <div className="header-container ">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Welcome to Mail-Box</h2>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Header;
