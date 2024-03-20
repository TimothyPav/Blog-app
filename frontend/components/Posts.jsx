import React, { useState, useEffect } from 'react';

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts') // Adjust the URL to match your backend's
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error("Fetching posts failed:", error));
  }, []);

    return (
        <div className='p-4'>
        {posts.map(post => (
            <div key={post._id} className="max-w-xl mx-auto border-green-300 bg-white border-4 rounded-xl shadow-md overflow-hidden mb-3">
              <div className="p-4">
            <h2 className="flex justify-center font-bold text-xl mb-2">{post.title}</h2>
            <p className="text-gray-700 text-base" style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4, // Adjust number of lines here
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {post.content}
          </p>
            </div>
            <div>
            <small className="p-4 flex justify-end">Posted on: {post.date}</small>
            </div>
            </div>
        ))}
        </div>
    );
}
