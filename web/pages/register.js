import Link from 'next/link';

const Register = () => {
    const address = 'http://localhost:4000';
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
                            name="email"
                            type="email"
                            placeholder="email"
                            autoComplete="email"
                            required
                        />

                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            autoComplete="new-password"
                            required
                        />

                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="confirm password"
                            autoComplete="new-password"
                            required
                        />

                        <input type="submit" value="Register" />
                    </form>
                    <Link href="/login" className="trouble">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
