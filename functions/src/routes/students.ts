import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, Studento!');
});

router.get('/:name', (req: Request, res: Response) => {
    let { name } = req.params;

    res.send(`Hello, Student ${name}!`);
});

export const StudentRoutes: Router = router;