import './auth.scss';
import { Link } from 'react-router-dom';

export const Register = () => {
    const address = process.env.SERVER_URL || 'http://localhost:4000';
    const formAction = `${address}/api/auth/register`;
    return (
        <div className="flexbox">
            <div className="content">
                <div className="box">
                    <form method="POST" action={formAction}>
                        <legend className="sign-in">
                            Tufts Reddit Registration
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
                            autoComplete="new-password"
                        />

                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="confirm password"
                            autoComplete="new-password"
                        />

                        <input type="submit" value="Register" />
                    </form>
                    <Link to="/login" className="trouble">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};
