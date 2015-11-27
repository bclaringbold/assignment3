// Import mongoose and bcrypt

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our todo Schema
var todoSchema = new Schema({
	name: String,
	completed: Boolean,
	username: String,
	note: String,
	salt: String,
	updated: {type:Date, default: Date.Now}
}, {
	collection: 'todos'
});

// Generate a Hash
todoSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);	

};

//check to see if password is valid
todoSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('todo', todoSchema);