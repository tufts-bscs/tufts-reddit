import { Router } from 'express';
import { authRouter } from './auth';
import { postRouter } from './posts';

const router = Router();

router.use(authRouter);
router.use(postRouter);

export { router };
