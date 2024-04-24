import { Link } from "react-router-dom";

const UserList = ({users}: any) => {
    return (
        <>
            {users.map((user: any, index: any) => (
                <div key={index} className="row mb-3 align-items-center">
                    <div className="col-6 d-flex align-items-center">
                        <img
                            src={user.image === undefined || user.image === '' ? "/default.jpg" : user.image}
                            alt="profile-image"
                            className="rounded-circle me-2"
                            style={{ maxWidth: "40px" }}
                        />
                        <h6>{user.username}</h6>
                    </div>
                    <div className="col-6 text-end">
                        <Link className="text-decoration-none" to={`/profile/${user._id}`}>
                            <h6 className="mb-0">Profile</h6>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
};
export default UserList;