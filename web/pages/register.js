import Link from 'next/link';

const Register = () => {
    console.log(process.env.SERVER_URL);
    const address = 'localhost:4000';
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
                    <Link href="/login" className="trouble">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
