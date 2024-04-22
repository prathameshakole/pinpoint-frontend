import { useNavigate } from "react-router"

export const SearchUser = ({ users }: any) => {
    const navigate = useNavigate();
    return (
        <div className="row">
            {users.slice(0, 10).map((user: any) => (
                <div
                    className="col-md-6 col-lg-4 mb-4"
                    onClick={() => navigate(`/profile/${user._id}`)}
                >
                    <div className="card h-100">
                        <div className="row g-0">
                            <div className="col-md-4 ratio ratio-1x1">
                                <img
                                    src={
                                        user.image === undefined || user.image === ''
                                            ? "/default.jpg"
                                            : user.image
                                    }
                                    alt="profile-image"
                                    className="img-fluid rounded-start"
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                                    <p className="card-text">
                                        <span className="fw-bold">@{user.username}</span>
                                    </p>
                                    <p className="card-text">
                                        <span className="fw-bold">{user.role}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}