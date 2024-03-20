import '../App.css'

import {NavLink} from 'react-router-dom'
import React, { useState } from 'react';

export default function TopBar() {
    const [showMenu, setShowMenu] = useState(false)

    return (
    <>
    <button className="homepage">
    <NavLink to = "/" className = "homelink"> <img src="https://cdn-icons-png.freepik.com/256/10263/10263239.png" alt="Homepage" className="icons"/> </NavLink>
    </button>

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

    </>
    )
}
