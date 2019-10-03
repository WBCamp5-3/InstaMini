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
			userName: {
				type: String
				// required: true
			},
			fullName: {
				type: String
				// required: true
			},
			profilePicture: {
				type: String
				// required: true
			}
		}
	]
});

module.exports = Following = mongoose.model("following", FollowingSchema);