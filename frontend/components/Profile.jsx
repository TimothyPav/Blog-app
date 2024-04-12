import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function () {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);  // State to hold user data
    const [username, setUsername] = useState(null)
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    //console.log(token)
    useEffect(() => {
        console.log("Fetching user profile...");
        fetch('http://localhost:3000/users/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log("Profile data:", data);
            setUser(data);
        })
        .catch(err => {
            toast.error("You must be signed in to view your profile!");
            navigate('/signin');
        });
    }, [navigate, token]); // Only re-run if navigate or token changes

    useEffect(() => {
        if (user && user.username) {
            console.log("Fetching posts by user: ", user.username);
            fetch(`http://localhost:3000/posts/by-author/${user.username}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Posts data: ", data);
                    setPosts(data); // Assuming you want to set posts here
                })
                .catch(error => console.error("Failed fetching posts: ", error));
        }
    }, [user]); // This useEffect triggers when `user` state changes

    console.log("Username state: " + username);

    return (
        <div>
            <h1>User Posts</h1>
            {posts.map(post => (
                <div key={post._id} className='post mb-10'>
                    <div className='text-center'>
                        <div className="inline-block px-9 border-green-300 bg-white border-4 rounded-xl shadow-md overflow-hidden mt-3 -mb-2 bg-opacity-30">
                        <h1 className="flex justify-center font-bold text-3xl mb-2 py-2">{post.title}</h1>
                        </div>
                        </div>
                        <div className="max-w-4xl mx-auto border-green-300 bg-white border-4 rounded-xl shadow-md overflow-hidden mb-3 bg-opacity-30">
                                <div className="flex justify-between items-center px-4 py-2 font-bold">
                                <small>Genre: {post.genre}</small>
                                <small>Posted on: {post.date}</small>
                                </div>
                                <div className="px-4 mb-3">
                                <p className="text-gray-700 text-base">
                                    {post.content}
                                </p>
                                </div>
                            </div>
                    {/* Other post details */}
                </div>
            ))}
        </div>
    )
}