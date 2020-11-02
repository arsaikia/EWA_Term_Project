// Connect To MySQl
MySQL.connect((err) => {
	if (err) {
		console.log(`Connection Unsuccessful ${err}`);
		process.exit(1);
	}
	console.log(`My SQL Connected`.green.underline.bold);
});

// GET request
app.get('/getAllUsers', (req, res) => {
	let sql = 'SELECT * from USERS;';
	MySQL.query(sql, (err, result) => {
		if (err) {
			console.log(`Connection Unsuccessful ${err}`);
			process.exit(1);
		}
		const resultObj = JSON.stringify(result);
		console.log(JSON.stringify(result));
		res.send(resultObj);
	});
});
