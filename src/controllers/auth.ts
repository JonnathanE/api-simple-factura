import { type Request, type Response } from 'express';

export const login = (req: Request, res: Response): void => {
	res.send('HOLA MUNDO');
};

export const generateCode = (req: Request, res: Response): void => {
	res.send('Geneerate login');
};
