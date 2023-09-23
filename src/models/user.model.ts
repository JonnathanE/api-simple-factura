import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	firstname: { type: String, require: true },
	lastname: { type: String, require: true },
	email: { type: String, require: true, unique: true },
	login_code: { type: String, require: true, length: 6 },
	roles: {
		admin: Boolean,
		seller: Boolean,
	},
});

export default model('User', userSchema, 'users');
