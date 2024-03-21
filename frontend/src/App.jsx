import { useState, useEffect } from 'react'; // Import useEffect
import Navbar from '../components/Navbar';
import BlogPosts from '../components/Posts';

const backgroundIMG = "https://www.veeforu.com/wp-content/uploads/2022/10/Simple-green-pastel-background.-scaled.jpg"


export default function App() {
  const [message, setMessage] = useState("");

  return (
    <>
    <div className="bg-slate-900">
      
    <Navbar />
    </div>
    <div style={{backgroundImage: `url(${backgroundIMG})`}}>
    <BlogPosts />
    <h1 className="text-3xl font-bold underline">
      Blog APP!
    </h1>
    </div>
    </>
  )
}
