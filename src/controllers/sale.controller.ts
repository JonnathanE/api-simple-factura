/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Response } from 'express';
import SalesModel from '@models/sale.model';

export const getAll = async (
	req: any,
	res: Response,
): Promise<Response<void, Record<string, undefined>>> => {
	try {
		const sales = await SalesModel.find({ user: req.user.sub });

		return res.status(200).json({ ok: true, data: sales });
	} catch (error) {
		return res.status(500).json({ ok: false, message: 'Error server' });
	}
};

export const create = async (
	req: any,
	res: Response,
): Promise<Response<void, Record<string, undefined>>> => {
	try {
		const { totalAmount } = req.body;
		const createdSale = await SalesModel.create({
			total_amount: totalAmount,
			user: req.user.sub,
		});

		return res.status(201).json({ ok: true, data: createdSale });
	} catch (error) {
		return res.status(500).json({ ok: false, message: 'Error server' });
	}
};
