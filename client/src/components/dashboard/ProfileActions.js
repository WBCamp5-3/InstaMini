import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
	return (
		<div className="btn-group mb-4" role="group">
			<Link to="/add-posts" className="btn btn-light">
				Post Image
			</Link>
			<Link to="/edit-profile" className="btn btn-light">
				Edit Profile
			</Link>
			<Link to="/following" className="btn btn-light">
				Following
			</Link>
		</div>
	);
};

export default ProfileActions;
