import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { setFollowingPosts } from "./reducer";
import Post from "../Post/post";
import { SetStateAction, useEffect, useState } from "react";

const Following = () => {
  const dispatch = useDispatch();
  const followingPosts = useSelector(
    (state: any) => state.postsReducer.followingPosts
  );
  const user = useSelector((state: any) => state.userReducer.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const fetchPosts = async (page = 1, size = postsPerPage) => {
    if (user._id !== undefined && user._id !== "") {
      const posts = await client.findFollowingPosts(user._id, page, size);
      dispatch(setFollowingPosts(posts));
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, postsPerPage);
  }, [user, currentPage, postsPerPage]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = followingPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

  return (
    <div className="mt-4">
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
              { length: Math.ceil(followingPosts.length / postsPerPage) },
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
              className={`page-item ${indexOfLastPost >= followingPosts.length ? 'disabled' : ''
                }`}
            >
              <button
                className="page-link"
                disabled={indexOfLastPost >= followingPosts.length}
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

export default Following;