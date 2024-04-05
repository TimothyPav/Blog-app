import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function IndividualPost() {
    console.log("IndividualPost component is being rendered");
    const [post, setPost] = useState(null);
    const { id } = useParams(); // Get the post ID from the URL
    console.log("Post ID:", id);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`) // Adjust the URL to match your API
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error("Fetching post failed:", error));
  }, [id]);

  if (!post) return <div>Loading QWERTY...</div>;

  return (
    <>
    <h1 className="flex justify-center font-bold text-xl mb-2">{post.title}</h1>
    <div className="max-w-4xl mx-auto border-green-300 bg-white border-4 rounded-xl shadow-md overflow-hidden mb-3 bg-opacity-30">
            <div className="p-4">
              <p className="text-gray-700 text-base">
                {post.content}
              </p>
            </div>
            <div>
              <small className="mr-4 flex justify-end">Genre: {post.genre}</small>
              <small className="mb-2 mr-4 flex justify-end">Posted on: {post.date}</small>
            </div>
          </div>
          </>
  );
}
