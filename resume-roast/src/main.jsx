import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Login from './pages/Login'
import Upload from './pages/Upload'
import About from './pages/About'

import './index.css'
import ResumeView from './pages/ResumeView.jsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/me", element: <Upload /> },
  { path: "/r", element: <App/>, children:[
    {
      path: ":userID",
      element: <ResumeView/>
    
    } 
  ]},
  { path: "/about", element: <About /> }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)