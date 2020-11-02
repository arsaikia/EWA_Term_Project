import express from 'express';
const router = express.Router();
import { SQL } from '../config/db.js';
import Users from '../models/User.js';
import { Sequelize } from 'sequelize';
const Op = Sequelize.Op;

router.get('/', (req, res) => {
	Users.findAll({
		attributes: ['userName', 'password', 'userType'],
		where: {
			password: '#2fxvUdcS#',
		},
	}).then(function (results) {
		res.status(200).json(results);
	});
});

export { router as userRoute };
s;
