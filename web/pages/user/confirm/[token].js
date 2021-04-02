import redirect from '../../../lib/redirect';

const Confirm = () => {
    return (
        <div>
            <p>Something went wrong!</p>
        </div>
    );
};

Confirm.getInitialProps = async ({ query: { token }, ...ctx }) => {
    if (!token) {
        return {};
    }

    await fetch(`http://localhost:4000/api/auth/validateEmail/${token}`);

    redirect(ctx, '/login');

    return {};
};

export default Confirm;
