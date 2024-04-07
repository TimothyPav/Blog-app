import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    // Handlers for changes in the title and body fields
    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleBodyChange = (event) => setBody(event.target.value);

    const backgroundStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // White with 70% opacity
        color: 'black', // Ensure text is black
      };

    return (
        <div className="flex flex-col items-center gap-4 mt-4 max-w-4xl mx-auto">
        <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            className="w-3/4 p-2 border border-gray-300 rounded-md text-lg"
            style={backgroundStyle}
        />
        <textarea
            value={body}
            onChange={handleBodyChange}
            placeholder="Body"
            className="w-3/4 p-2 h-40 border border-gray-300 rounded-md text-lg"
            style={backgroundStyle}
        />
        </div>
    )
}