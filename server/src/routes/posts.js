import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';

const postRouter = Router();

postRouter.get('/posts', verifyToken, (req, res) => {
    res.send('TODO: SEND POST DATA');
});

export { postRouter };
