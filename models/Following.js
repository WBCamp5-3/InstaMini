const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowingSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},

	People: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			},
			username: {
				type: String,
				required: true
			},
			fullname: {
				type: String,
				required: true
			},
			profilepicture: {
				type: String,
				required: true
			}
		}
	]
});

module.exports = Following = mongoose.model("following", FollowingSchema);