import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';

const Users = SQL.define(
	'users',
	{
		userName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		userType: {
			type: Sequelize.STRING,
			default: 'customer',
		},
	},
	{
		timestamps: false,
	}
);

Users.sync().then(() => {
	console.log('Users created');
});

export default Users;
