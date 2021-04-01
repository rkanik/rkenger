const fs = require('fs-extra');
const path = require('path');

try {
	fs.removeSync(path.join(__dirname, '../../public'))
	fs.copySync(
		path.join(__dirname, '../build'),
		path.join(__dirname, '../../public')
	);
	fs.removeSync(path.join(__dirname, '../build'))
} catch (error) {
	console.log(error)
}