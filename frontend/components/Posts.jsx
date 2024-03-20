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
        <div>
        {posts.map(post => (
            <div key={post._id} className=" box-content h-32 w-96 p-4 border-4 ">
            <h2 className="font-bold flex items-center justify-center">{post.title}</h2>
            <p className="flex items-center justify-center">{post.content}</p>
            <small className="p-4 flex justify-end">Posted on: {post.date}</small>
            </div>
        ))}
        </div>
    );
}
