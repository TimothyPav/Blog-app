import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function IndividualPost() {
    const [post, setPost] = useState(null);
    const { id } = useParams(); // Get the post ID from the URL
  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`) // Adjust the URL to match your API
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error("Fetching post failed:", error));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <>
    <div className='text-center'>
    <div className="inline-block px-9 border-green-300 bg-white border-4 rounded-xl shadow-md overflow-hidden mb-3 mt-3 bg-opacity-30">
    <h1 className="flex justify-center font-bold text-3xl mb-2 py-2">{post.title}</h1>
    </div>
    </div>
    <div className="max-w-4xl mx-auto border-green-300 bg-white border-4 rounded-xl shadow-md overflow-hidden mb-3 bg-opacity-30">
            <div className="flex justify-between items-center px-4 py-2 font-bold">
              <small>Author: {post.author}</small>
              <small>Genre: {post.genre}</small>
              <small>Posted on: {post.date}</small>
            </div>
            <div className="px-4">
              <p className="text-gray-700 text-base">
                {post.content}
              </p>
            </div>
          </div>
          </>
  );
}
