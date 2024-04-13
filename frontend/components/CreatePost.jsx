import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [genre, setGenre] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Handlers for changes in the title and body fields
    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleBodyChange = (event) => setBody(event.target.value);

    const backgroundStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // White with 70% opacity
        color: 'black', // Ensure text is black
      };

    // Function to handle creating a new post
    const createPost = async () => {
        const newPost = { title: title, content: body , genre: genre}; // Construct the post object

        try {
            const response = await fetch('http://localhost:3000/posts/', { // Adjust with your actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content: body, genre: genre })
            });

            if (!response.ok) {
                toast.error("Fill out all fields to create a post!")
                throw new Error('Failed to create post');
            }

            const responseData = await response.json();
            console.log('Post created successfully:', responseData);
        
            setTitle(''); // Clear title field
            setBody(''); // Clear body field
            toast.success("Post created successfully")
            navigate('/')
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const genres = ['Fiction', 'Non-Fiction', 'Comedy', 'Drama', 'Horror', 'Other'];

    return (
        <div className="flex flex-col items-center gap-4 mt-4 max-w-4xl mx-auto">
        <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            className="w-3/4 p-2 border border-gray-300 rounded-md text-lg shadow-md"
            style={backgroundStyle}
        />
        <textarea
            value={body}
            onChange={handleBodyChange}
            placeholder="Body"
            className="w-3/4 p-2 h-40 border border-gray-300 rounded-md text-lg shadow-md"
            style={backgroundStyle}
        />
        <div className="flex gap-4 items-center">
                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="border border-gray-300 rounded-md text-lg shadow-md p-2 cursor-pointer"
                    style={backgroundStyle}
                >
                    <option value="">Select Genre</option>
                    {genres.map((g) => (
                        <option key={g} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={createPost}
                    className="font-black bg-gray-50 opacity-70 w-40 h-10 border border-gray-300 rounded-md text-lg ease-in-out shadow-md hover:bg-green-300"
                >
                    Create Post
                </button>
            </div>
        </div>
    )
}