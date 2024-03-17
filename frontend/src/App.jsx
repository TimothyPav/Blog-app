import { useState, useEffect } from 'react'; // Import useEffect


export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/api/hello')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMessage(data.message);
        // Set your state or perform actions with the data
      });
  }, []); // An empty dependency array means this effect runs once on component mount


  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!
      </h1>
      <p>{message}</p> {/* Display the message from the backend */}
    </>
  )
}
