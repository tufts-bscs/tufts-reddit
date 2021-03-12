import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <>
            <p>There is no home page yet, but feel free to register/login.</p>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/register">Register</Link>
        </>
    );
};
