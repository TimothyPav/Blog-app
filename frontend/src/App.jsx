import { useState, useEffect } from 'react'; // Import useEffect
import Navbar from '../components/Navbar';


export default function App() {
  const [message, setMessage] = useState("");

  return (
    <>
    <div className="bg-slate-900">
    <Navbar />
    </div>
    <h1 className="text-3xl font-bold underline">
      Blog APP!
    </h1>
    </>
  )
}
