import { useDispatch, useSelector } from 'react-redux';
import * as client from './client'
import { setPosts } from "./reducer"
import Post from '../Post/post';
import { SetStateAction, useEffect, useState } from 'react';

const Trending = () => {
    const dispatch = useDispatch()
    const trendingPosts = useSelector((state: any) => state.postsReducer.trendingPosts);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const fetchPosts = async () => {
        const posts = await client.findTrendingPosts(currentPage, postsPerPage)
        dispatch(setPosts(posts))
    }

    useEffect(() => {
        fetchPosts()
    }, [currentPage, postsPerPage]);

    const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = trendingPosts.slice(indexOfFirstPost, indexOfLastPost);
    return (
        <div className='mt-4'>
            {currentPosts.map((post: any, index: any) => (
                <Post key={post._id} post={post} />
            ))}
            <div className="d-flex justify-content-center m-4">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                disabled={currentPage === 1}
                                onClick={() => paginate(currentPage - 1)}
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from(
                            { length: Math.ceil(trendingPosts.length / postsPerPage) },
                            (_, i) => (
                                <li
                                    key={i + 1}
                                    className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => paginate(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            )
                        )}
                        <li
                            className={`page-item ${indexOfLastPost >= trendingPosts.length ? 'disabled' : ''
                                }`}
                        >
                            <button
                                className="page-link"
                                disabled={indexOfLastPost >= trendingPosts.length}
                                onClick={() => paginate(currentPage + 1)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
export default Trending;
