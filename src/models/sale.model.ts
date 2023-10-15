import { Schema, Types, model } from 'mongoose';

const saleSchema = new Schema({
	total_amount: { type: Number },
	user: { type: Types.ObjectId, ref: 'User' },
});

export default model('Sale', saleSchema, 'sales');
