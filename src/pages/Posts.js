import React, { useEffect, useRef, useState } from "react";
import MySelect from "../components/UI/select/MySelect";
import { useObserver } from "../hooks/useObserver";
import PostService from "./../API/PostService";
import PostFilter from "./../components/PostFilter";
import PostForm from "./../components/PostForm";
import PostList from "./../components/PostList";
import MyButton from "./../components/UI/button/MyButton";
import Loader from "./../components/UI/Loader/Loader";
import MyModal from "./../components/UI/MyModal/MyModal";
import Pagination from "./../components/UI/pagination/Pagination";
import { useFetching } from "./../hooks/useFetching";
import { usePosts } from "./../hooks/usePosts";

import "./../styles/App.css";
import { getPageCount } from "./../utils/pages";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: "20px" }} onClick={() => setModal(true)}>
        Create Post
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Показать все!" },
        ]}
      />

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />

      {postError && <h1>Error: {postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Список Постов"
      />
      <div ref={lastElement} />
      {isPostsLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Loader />
        </div>
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}
export default Posts;
