import { useState, useEffect } from 'react'; // Import useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BlogPosts from '../components/Posts';
import IndividualPost from '../components/IndividualPost';

const backgroundIMG = "https://www.veeforu.com/wp-content/uploads/2022/10/Simple-green-pastel-background.-scaled.jpg"


export default function App() {
  const [message, setMessage] = useState("");

  return (
    <Router>
      <div className="bg-slate-900">
        <Navbar />
      </div>
      <div style={{backgroundImage: `url(${backgroundIMG})`}}>
        {/* The Routes component wraps Route components to enable routing */}
        <Routes>
          {/* Route for the home page that lists all blog posts */}
          <Route path="/" element={<BlogPosts />} />
          {/* Route for individual blog posts, note the ":id" parameter */}
          <Route path="/posts/:id" element={<IndividualPost />} />
        </Routes>
        <h1 className="text-3xl font-bold underline">
          Blog APP!
        </h1>
      </div>
    </Router>
  );
}
