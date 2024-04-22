import { ClickableImage } from "../Post/clickableImage"

export const SearchPosts = ({ posts }: any) => {
    return (
        <div className="col-lg-10">
            <div className="row">
                {posts.slice(0, 10).map((post: any) => (
                    <div key={post._id} className="col-md-6 mb-4">
                        <ClickableImage post={post} />
                    </div>
                ))}
            </div>
        </div>
    )
}
