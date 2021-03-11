import { model, Schema } from 'mongoose';

const tokenType = {
    EMAIL: 'EMAIL',
    PASSWORD: 'PASSWORD',
};

const tokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: 'User',
        },
        token: {
            type: String,
            required: true,
            unique: true,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now(),
            expires: 43200, // 12 hours
        },
        type: {
            type: String,
            required: true,
            default: tokenType.EMAIL,
        },
    },
    { timestamps: true }
);

const Token = model('Token', tokenSchema);
export { Token, tokenType };
