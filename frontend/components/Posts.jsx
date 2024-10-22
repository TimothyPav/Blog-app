import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts/') // Adjust the URL to match your backend's
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error("Fetching posts failed:", error));
  }, []);

  return (
    <div className='p-4 max-w-4xl mx-auto'>
      {posts.map(post => (
        <Link to={`/posts/${post._id}`} key={post._id} style={{ textDecoration: 'none' }}>
          <div className="max-w-4xl mx-auto border-green-300 bg-white border-4 rounded-xl shadow-md overflow-hidden mb-3 bg-opacity-30">
            <div className="px-4 py-2">
              <h2 className="flex justify-center font-bold text-xl mb-2">{post.title}</h2>
              <p className="text-gray-700 text-base" style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 4,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {post.content}
              </p>
            </div>
            <div className="flex justify-between items-center px-4 py-2">
              <small>Author: {post.author}</small>
              <small>Genre: {post.genre}</small>
              <small>Posted on: {post.date}</small>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
