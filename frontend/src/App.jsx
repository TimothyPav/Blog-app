import { useState, useEffect } from 'react'; // Import useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';
import BlogPosts from '../components/Posts';
import IndividualPost from '../components/IndividualPost';
import CreatePost from '../components/CreatePost';
import SignIn from '../components/SignIn'
import CreateAccount from '../components/CreateAccount';
import Test from '../components/Test'
import Profile from '../components/Profile'


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
    <Router>
      <div style={appStyle}>
        <div className="bg-slate-900">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<BlogPosts />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/:id" element={<IndividualPost />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/test" element={<Test />} />
          <Route path="/users/profile" element={<Profile />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
          bodyClassName="text-sm font-white font-med block p-3"
          progressClassName="bg-green-600"
        />
        <h1 className="text-3xl font-bold underline">
          Blog APP!
        </h1>
      </div>
    </Router>
  );
}
