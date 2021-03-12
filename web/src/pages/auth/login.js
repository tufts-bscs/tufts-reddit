import React from 'react';
import { Link } from 'react-router-dom';
import './auth.scss';

export const Login = () => {
    const address = process.env.SERVER_URL || 'localhost:3000';
    const formAction = `${address}/api/auth/login`;
    return (
        <div className="flexbox">
            <div className="content">
                <div className="box">
                    <form method="POST" action={formAction}>
                        <legend className="sign-in">
                            Tufts Reddit Sign In
                        </legend>

                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="email"
                            autoComplete="email"
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="password"
                            autoComplete="current-password"
                        />

                        <input type="submit" value="Sign In" />
                    </form>
                    <Link to="/register" className="trouble">
                        Have not registed?
                    </Link>
                </div>
            </div>
        </div>
    );
};
