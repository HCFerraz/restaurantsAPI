const mongoose = require('../node_modules/mongoose');

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	token: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;