import Post from "../Post/post"

export const SearchPosts = ({ posts }: any) => {
    return (
        <div className="col-lg-8">
            {posts.slice(0, 10).map((post: any) => (
                <div>
                    <Post post={post}></Post>
                </div>
            ))}
        </div>
    )
}
