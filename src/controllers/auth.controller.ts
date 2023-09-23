import { type Request, type Response } from 'express';
import sendEmail from 'src/helpers/mailer';
import userModel from '@models/user.model';

export const login = (req: Request, res: Response): void => {
	res.send('HOLA MUNDO');
};

export const generateCode = async (
	req: Request,
	res: Response,
): Promise<Response<void, Record<string, undefined>>> => {
	// get param email
	const { email } = req.params;

	// search user
	const user = await userModel.findOne({ email });

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
