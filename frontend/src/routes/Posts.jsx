import { Outlet } from "react-router-dom";

import PostList from ".././components/PostList";

function Posts() {

  return (
    <>
    <Outlet />
    <main>
      <PostList />
    </main>
    </>
  );
}

export default Posts;

export async function loader() {
  try {
    const response = await fetch('http://localhost:8080/posts');

    if (!response.ok) {
      throw new Response('Failed to fetch posts.', {status: 500});
    }

    const resData = await response.json();
    return resData.posts;

  } catch (err) {
    throw new Response('Could not connect to the backend.', {status: 503});
  }

}