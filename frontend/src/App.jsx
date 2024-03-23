import { useState, useEffect } from 'react'; // Import useEffect
import Navbar from '../components/Navbar';
import BlogPosts from '../components/Posts';

const backgroundIMG = "https://www.veeforu.com/wp-content/uploads/2022/10/Simple-green-pastel-background.-scaled.jpg"


export default function App() {
  const [message, setMessage] = useState("");

  const appStyle = {
    backgroundImage: `url(${backgroundIMG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // This makes sure your div stretches to at least the full height of the viewport
  };

  return (
    <div style={appStyle}>
      <div className="bg-slate-900">
        <Navbar />
      </div>
      <BlogPosts />
      <h1 className="text-3xl font-bold underline text-white">
        Blog APP!
      </h1>
    </div>
  );
}
