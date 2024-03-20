import './App.css'

import {NavLink} from 'react-router-dom'

import React, { useState, useEffect } from 'react';

export default function App() {
    const [showMenu, setShowMenu] = useState(false)

    const [pdfInfo, setpdfInfo] = useState([]); 
    const [pdfImg, setpdfImg] = useState([]);

    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/allpdfs');
          if (!response.ok) {
            throw new Error('Data could not be fetched!');
          }
          const data = await response.json();
          setpdfInfo(data); 
          setIsLoading(false);
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      };

      fetchData();
    }, []); // The empty array ensures this effect runs only once after initial render

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>


    <div className="TopBar">

    <button className="homepage" onClick={() => console.log('Button clicked!')}>
        <NavLink to = "/" className = "homelink"> <img src="https://cdn-icons-png.freepik.com/256/10263/10263239.png" alt="Homepage" className = "icons"/> </NavLink>
    </button>

    <h1> Resume Roasts! </h1>


    {!showMenu && (
        <button className="popup" onClick={() => setShowMenu(!showMenu)}>
        <img src="https://icons.veryicon.com/png/o/miscellaneous/ionicons-1/ios-settings-5.png" alt="Popup" className="icons"/>
        </button>
    )}
       
    {showMenu && (
        <div className="dropdown-menu">
            <button>
                <NavLink to = "/login" className = "signinlink" > Sign In </NavLink>
            </button>    

            <button>
                <NavLink to = "/about" className = "aboutlink" > About </NavLink>
            </button>

            <button onClick={() => setShowMenu(!showMenu)}>
                Exit
            </button>
        </div>
    )}
</div>

    <div className = "layout">
    {pdfInfo.map(pdf => (
        <div key = {pdf.id} className = "card">
            {pdfInfo && <NavLink to={"/r/" + pdf.id}> <img src={"/api/thumbnail/?id=" + pdf.id} alt="Thumbnail" className = "pdfs"/> </NavLink>}
        </div>
    ))}
    </div>

    </>
   )
}
