const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowingSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	following: {
		type: String,
		required:true
	},
	userName: {
		type: String
	},
	fullName: {
		type: String
	},
	profilePicture: {
		type: String
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