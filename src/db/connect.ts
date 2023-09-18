import mongoose from 'mongoose';

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
			console.log('DB is connected to', db.connection.name);
		} else {
			console.log('DB TEST is connected');
		}
	} catch (error) {
		console.error(error);
	}
}

export default connectDB;
