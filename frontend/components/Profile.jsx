import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function () {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    //console.log(token)
    useEffect(() => {
        console.log("hi")
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
            fetch('http://localhost:3000/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data) => {
                console.log("Profile data:", data);
                // Handle your data
            })
            .catch((err) => {
                toast.error("You must be signed in to view your profile!"); // Displaying toast on error
                navigate('/signin');
            });
    }, [navigate]);

    return (
        <div>
            <h1>THIS IS THE PROFILE</h1>
        </div>
    )
}