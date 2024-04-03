import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function IndividualPost() {
    const [post, setPost] = useState(null); // Used to store the individual post
    const { id } = useParams(); // Get the id parameter from the URL

    useEffect(() => {
        // Define a function to fetch the post
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/posts/${id}`); // Adjust the URL to match your backend's
                const data = await response.json();

                if (response.ok) {
                    setPost(data); // Set the post in state
                } else {
                    throw new Error(data.message || 'Something went wrong');
                }
            } catch (error) {
                console.error("Fetching individual post failed:", error);
                // Handle errors as needed
            }
        };

        fetchPost();
    }, [id]); // The dependency array with id ensures this effect runs when the id changes

    if (!post) {
        return <div>Loading...</div>; // Or some loading component/spinner
    }

    return (
        <div>
            <h1>hi</h1>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {/* Render other post details as needed */}
        </div>
    );
}
