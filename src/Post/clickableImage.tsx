import { useNavigate } from "react-router"

export const ClickableImage = ({ post }: any) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/post/${post._id}`)} className="col-lg-12">
            <div className="card h-100">
                <div className='ratio ratio-1x1'>
                    <img className="card-img-top" key={post._id} src={post.image} alt="image" style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                    }} />
                </div>
            </div>
        </div>
    )
}
