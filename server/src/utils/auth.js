import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Token } from '../models/Token';

export const createTokens = (user) => {
    const refreshTokenSecret =
        process.env.REFRESH_TOKEN_SECRET || 'SOME REFRESH SECRET';
    const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || 'SOME ACCESS SECRET';
    const refreshToken = jwt.sign(
        {
            userId: user.id,
            count: user.count,
        },
        refreshTokenSecret,
        { expiresIn: '7d' }
    );

    const accessToken = jwt.sign({ userId: user.id }, accessTokenSecret, {
        expiresIn: '1m',
    });

    return { refreshToken, accessToken };
};

export const generateVerificationToken = async (user, type) => {
    const tokenString = crypto.randomBytes(20).toString('hex');
    const token = new Token({
        userId: user._id,
        token: tokenString,
        type,
    });
    await token.save();
    return token;
};
