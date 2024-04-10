import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function () {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('token');
    //console.log(token)
    useEffect(() => {
        fetch('http://localhost:3000/users/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Include the token in your request headers
        },
        })
           .then((response) => response.json())
           .then((data) => {
              console.log(data);
              setPosts(data);
              console.log("user is logged in")
              
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, []);

    return (
        <div>
            <h1>THIS IS THE PROFILE</h1>
        </div>
    )
}