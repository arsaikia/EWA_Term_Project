import colors from 'colors';
import mongoose from 'mongoose';
import mysql from 'mysql';
import { Sequelize } from 'sequelize';

const MongoDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.error(`Error: ${error.message}`.red.underline.bold);
		process.exit(1);
	}
};

const PORT = process.env.AWS_MYSQL_PORT || 3306;
const MySQL = mysql.createConnection({
	host: 'ewa-term-project-instance.ccstkwakl93l.us-east-2.rds.amazonaws.com',
	port: PORT,
	user: 'admin',
	password: '#ewa_term_project#',
	database: 'ewaDB',
	// here you can set connection limits and so on
});

const SQL = new Sequelize('ewaDB', 'admin', '#ewa_term_project#', {
	host: 'ewa-term-project-instance.ccstkwakl93l.us-east-2.rds.amazonaws.com',
	dialect: 'mysql',
	port: PORT,
});

export { MongoDB, MySQL, SQL };
