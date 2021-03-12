import './auth.scss';
import { Link } from 'react-router-dom';

export const Register = () => {
    return (
        <div className="flexbox">
            <div className="content">
                <div className="box">
                    <form>
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
