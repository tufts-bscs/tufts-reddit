import Link from 'next/link';
import React from 'react';

const Login = () => {
    const address = 'localhost:4000';
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
                    <Link href="/register" className="trouble">
                        Have not registed? Click Here
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Login;
