import './App.css'

import {NavLink} from 'react-router-dom'

import React, { useState } from 'react';

import TopBar from './pages/TopBar'


const testPdfs = [
  {
    id: 0,
    pdfLinks: [
      "https://www.clickdimensions.com/links/TestPDFfile.pdf",
      "https://whatever.link/oldVersion.pdf" 
    ],
    publisher: "Bob",
    version: 2
  },
  {
    id: 1,
    pdfLinks: [
      "https://www.clickdimensions.com/links/TestPDFfile.pdf",
      "https://whatever.link/oldVersion.pdf" 
    ],
    publisher: "Tim",
    version: 5
  },
  {
    id: 2,
    pdfLinks: [
      "https://www.clickdimensions.com/links/TestPDFfile.pdf",
      "https://whatever.link/oldVersion.pdf" 
    ],
    publisher: "Kim",
    version: 1
  },
]
export default function App() {
    const [showMenu, setShowMenu] = useState(false)

    return (
    <>
    <TopBar />
    <div className = "layout">
    {testPdfs.map(pdf => (
        <div key = {pdf.id} className = "card">
            <iframe src={"https://docs.google.com/viewer?url=" + pdf.pdfLinks[0] + "&embedded=true"} width="300" height="300" frameBorder="0"></iframe>
            <p> Publisher: {pdf.publisher} </p>
            <p> Version: {pdf.version} </p>
            <p> Comments:  </p>
        </div>
    ))}
    </div>
    </>
    )
}
