/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, type Response, type NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

interface UserToken {
	sub: string;
	firstname: string;
	lastname: string;
	roles: { admin: boolean; seller: boolean };
}

export interface CustomRequest extends Request {
	user: UserToken;
}

export const validateJWT = () => {
	return async (req: any, res: Response, next: NextFunction): Promise<void> => {
		try {
			const token = req.cookies.jwt;
			const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
			// TODO: Buscar el usuario en la DB
			req.user = user;
			next();
		} catch (error) {
			if (
				error instanceof JsonWebTokenError ||
				error instanceof TokenExpiredError
			) {
				res.status(401).json({ ok: false, message: error.message });
			} else {
				res.status(500).json({ ok: false, message: 'Error server' });
			}
		}
	};
};
