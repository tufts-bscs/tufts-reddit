import Joi from '@hapi/joi';

export const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string()
            .min(6)
            .required()
            .email()
            .custom((value, helper) => {
                const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@tufts.edu)$/;
                if (!value.match(regEx)) {
                    return helper.message(
                        'Email must be a valid Tufts address'
                    );
                }
                return true;
            }),
        password: Joi.string().min(8).required(),
    });

    return schema.validate(data);
};

export const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email()
            .custom((value, helper) => {
                const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@tufts.edu)$/;
                if (!value.match(regEx)) {
                    return helper.message(
                        'Email must be a valid Tufts address'
                    );
                }
                true;
            }),
        password: Joi.string().min(8).required(),
    });

    return schema.validate(data);
};
