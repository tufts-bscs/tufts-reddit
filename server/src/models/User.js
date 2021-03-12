import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    count: {
        type: Number,
        default: 0,
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
    isAccountLocked: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const User = model('User', userSchema);
export { User };
