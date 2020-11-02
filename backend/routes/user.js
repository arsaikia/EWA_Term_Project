import express from 'express';
const router = express.Router();
import { SQL } from '../config/db.js';
import Users from '../models/User.js';
import { Sequelize } from 'sequelize';
const Op = Sequelize.Op;

router.get('/', (req, res) => {
	Users.findAll({
		attributes: ['userName', 'password', 'userType'],
	}).then(function (results) {
		res.status(200).json(results);
	});
});

router.get('/:id', (req, res) => {
	Users.findAll({
		attributes: ['userName', 'password', 'userType'],
		where: {
			userName: req.params.id
		},

// Export the rputer
export { router as userRoute };
