import { useLoaderData } from 'react-router-dom';

import Post from './Post';

import classes from './PostList.module.css';

function PostList() {
    const posts = useLoaderData();

    return (
        <>
        {posts.length > 0 && (
        <ul className={classes.posts}>
            {posts.map((post) => <Post key={post.id} id={post.id} author={post.author} text={post.body} />)}
        </ul>
        )}
        {posts.length === 0 && (
            <div style={{textAlign: 'center'}}>
                <p>there are no posts here </p>
            </div>
            
        )}
       
        </>
    )
}

export default PostList;