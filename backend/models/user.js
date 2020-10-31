import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';

const Users = SQL.define('users', {
	userName: {
		type: Sequelize.STRING,
	},
	password: {
		type: Sequelize.STRING,
	},
	userType: {
		type: Sequelize.STRING,
		default: 'customer',
	},
});

Users.sync().then(() => {
	console.log('Users created');
});

export default Users;
