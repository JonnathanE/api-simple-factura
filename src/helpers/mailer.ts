import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: 'smtp-mail.outlook.com',
	// secureConnection: false, // TLS requires secureConnection to be false
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

interface EmailParams {
	to: string;
	subject: string;
	html: string;
}
/**
 * The above function is an asynchronous function that sends an email using the nodemailer library in
 * TypeScript.
 * @param {EmailParams}  - The `EmailParams` interface defines the shape of the parameters expected by:
 * - `to`: destination email.
 * - `subject`: subject line.
 * - `html`: html body.
 * the `sendEmail` function. It has three properties:
 * @returns The `sendEmail` function returns a promise that resolves to an object with the following
 * properties:
 * - `ok`: a boolean indicating whether the email was sent successfully or not.
 * - `message`: a string message describing the result of the email sending operation.
 * - `err`: an unknown type representing any error that occurred during the email sending operation.
 */
const sendEmail = async ({
	to,
	subject,
	html,
}: EmailParams): Promise<{
	ok: boolean;
	message: string;
	err: unknown;
}> => {
	try {
		const result = await transporter.sendMail({
			from: process.env.EMAIL, // sender address
			to, // list of receivers
			subject, // Subject line
			html, // html body
		});
		// eslint-disable-next-line no-console
		console.log(result);

		return {
			ok: true,
			message: 'Excelente, mail enviado con éxito',
			err: null,
		};
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log({ error });
		return {
			ok: false,
			message: 'Hubo un problema al enviar el email',
			err: error,
		};
	}
};

export default sendEmail;
