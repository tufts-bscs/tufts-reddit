import { Router } from 'express';
import bcrypt from 'bcryptjs';

import { createTokens, generateVerificationToken } from '../utils/auth';
import { registerValidation, loginValidation } from '../utils/validation';
import { User } from '../models/User';
import { Token, tokenType } from '../models/Token';
import { sendRegistationConfirmationEmail } from '../utils/sendEmail';
import { verifyToken } from '../middlewares/verifyToken';

const authRouter = Router();

authRouter.post('/auth/register', async (req, res) => {
    // validate data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user already exists
    const emailExsits = await User.findOne({ email: req.body.email });
    if (emailExsits) return res.status(400).send('Email already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Create a new user
    const user = new User({
        name: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email,
        password: hashedPassword,
    });

    // Save user and token and send email
    try {
        await user.save();
        const token = await generateVerificationToken(user, tokenType.EMAIL);
        await sendRegistationConfirmationEmail(req, res, token, user.email);

        // res.status(200).send({ id: savedUser._id });
        res.status(200).send('Successful registration');
    } catch (err) {
        res.status(400).send(err);
    }
});

authRouter.post('/auth/login', async (req, res) => {
    // validate data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user doesnt exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong');

    // Check if the user is verified and not locked
    if (!user.isVerified)
        return res.status(401).send('Email must be verified to login');
    if (user.isAccountLocked) return res.status(401).send('Account locked');

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong');

    // Create a token
    const { refreshToken, accessToken } = createTokens(user);
    res.cookie('refresh-token', refreshToken);
    res.cookie('access-token', accessToken);

    res.status(200).send('logged in');
});

authRouter.post('/auth/logout', verifyToken, async (req, res) => {
    const user = await User.findOneAndUpdate(
        req.userId,
        { $inc: { count: 1 } },
        { new: true }
    );

    if (!user) {
        res.status(401).send('Authenticated User does not exist');
        return;
    }

    res.clearCookie('access-token');
    res.clearCookie('refresh-token');
    res.status(200).send('Successful logout');
});

authRouter.post('/auth/delete', verifyToken, async (req, res) => {
    // validate data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.userId);
    if (!user) {
        res.status(401).send('User does not exist');
        return;
    }

    // Check email matches
    if (user.email != req.body.email) {
        res.status(400).send('Username or password does not match');
        return;
    }

    // Check password matches
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
        res.status(400).send('Username or password does not match');
        return;
    }

    // remove user
    res.clearCookie('refresh-token');
    res.clearCookie('access-token');

    try {
        const email = user.email;
        await User.deleteOne({ email });
    } catch (err) {
        res.status(400).send('An error occurred while trying to delete');
    }
});

// TODO: activate account route
authRouter.get('/auth/validateEmail/:tokenId', async (req, res) => {
    // Get token from request
    const { tokenId } = req.params;

    // Get token from database
    const token = await Token.findOne({ token: tokenId });
    if (!token || token.type !== 'EMAIL') {
        return res.status(401).send('Bad or invalid token');
    }

    // Update user and token
    await User.updateOne({ _id: token.userId }, { isVerified: true });
    await Token.findByIdAndDelete(token._id);

    // TODO: Send User and email saying there account is now verified

    return res.status(200).send('Successfully verified account');
});

export { authRouter };
