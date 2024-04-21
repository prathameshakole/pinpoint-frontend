export const SearchUser = ({users}: any) => {
    return (
        <div className="col-lg-12">
            {users.slice(0, 10).map((user: any) => (
                <div className="row g-0 card">
                    <div className="col-md-3">
                        <img
                            src={user.image === undefined || user.image === '' ? "/default.jpg" : user.image}
                            alt="profile-image"
                            className="img-fluid rounded-start"
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                            }} />
                    </div>
                    <div className="col-md-8">
                        <div className=" ms-4 mt-3">
                            <h5>{user.firstName} {user.lastName}</h5>
                            <p>
                                <span className="fw-bold"></span> @{user.username}
                            </p>
                            <p>
                                <span className="fw-bold"></span> {user.role}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}