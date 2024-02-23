import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../Reducer/authSlice';
import './login.css';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('All fields are mandatory');
            return;
        }

        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCi8np-w6bC6OmX92p2J4JX-JF87puzk7Q',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        returnSecureToken: true,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setError(null);
                dispatch(loginSuccess(data));
                setFormData({
                    email: '',
                    password: '',
                });
                console.log('Login successful!');
                navigate('/welcome');
            } else {
                setError(data.error.message);
            }
        } catch (error) {
            setError('An error occurred during login');
            dispatch(loginFailure(error.message));
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                    <p className="mt-3">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                    {error && <p className="text-danger">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;