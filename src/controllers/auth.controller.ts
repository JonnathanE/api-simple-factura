import { type Request, type Response } from 'express';
import sendEmail from '@helpers/mailer';
import UserModel from '@models/user.model';
import jwt from 'jsonwebtoken';

export const login = async (
	req: Request,
	res: Response,
): Promise<Response<void, Record<string, undefined>>> => {
	const { email } = req.params;
	const { code } = req.body;

	const user = await UserModel.findOne({ email, login_code: code });

	if (user == null) {
		return res.status(400).json({ ok: false, message: 'Código incorrecto' });
	}

	const token = jwt.sign(
		{
			sub: user._id,
			firstname: user.firstname,
			lastname: user.lastname,
			roles: user.roles,
		},
		process.env.JWT_SECRET_KEY as string,
	);

	res.cookie('jwt', token);

	return res
		.status(200)
		.json({ ok: true, message: 'Inicio de sesión exitoso' });
};

export const generateCode = async (
	req: Request,
	res: Response,
): Promise<Response<void, Record<string, undefined>>> => {
	// get param email
	const { email } = req.params;

	// search user
	const user = await UserModel.findOne({ email });

	if (user == null) {
		return res.status(400).json({ ok: false, message: 'Usuario inexistente' });
	}

	// generate random code
	let randomCode: string = '';

	for (let i = 0; i <= 5; i++) {
		const number: number = Math.floor(Math.random() * 10);
		randomCode += number;
	}

	// save random code in user
	user.login_code = randomCode;

	await user.save();

	// send email the random code to user
	void sendEmail({
		to: email,
		subject: 'Este es tu código' + randomCode,
		html: 'Código para ingresar: ' + randomCode,
	});

	return res.status(200).json({ ok: true, message: 'Codigo enviado al email' });
};
