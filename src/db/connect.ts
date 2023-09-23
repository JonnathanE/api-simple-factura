import mongoose from 'mongoose';
// import User from '@models/user.model';

async function connectDB(): Promise<undefined> {
	const { DATABASE, DATABASE_TEST, NODE_ENV } = process.env;

	const connectionString = NODE_ENV === 'test' ? DATABASE_TEST : DATABASE;

	if (connectionString == null) {
		throw new Error(
			'Remember that you have to have a .env file with the environment variables defined and the DATABASE that will serve as the connection string.',
		);
	}
	try {
		const db = await mongoose.connect(connectionString);
		if (NODE_ENV !== 'test') {
			// eslint-disable-next-line no-console
			console.log('DB is connected to', db.connection.name);
		} else {
			// eslint-disable-next-line no-console
			console.log('DB TEST is connected');
		}

		// const newUser = new User({
		// 	firstname: 'Jonnathan',
		// 	lastname: 'Espinoza',
		// 	email: 'jonnathan.espinoza@unl.edu.ec',
		// 	login_code: '123456',
		// 	roles: {
		// 		admin: true,
		// 		seller: true,
		// 	},
		// });
		// console.log(newUser);
		// await newUser.save();
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
	}
}

export default connectDB;
