import Link from 'next/link';
const Home = () => {
    return (
        <>
            <p>There is no home page yet, but feel free to register/login.</p>
            <Link href="/login">Login</Link>
            <br />
            <Link href="/register">Register</Link>
        </>
    );
};

export default Home;
