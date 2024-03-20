import {NavLink} from 'react-router-dom'

export default function LoginLink() {
  const queryParams = new URLSearchParams({
    client_id: import.meta.env.VITE_DROPBOX_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URL,
    response_type: "code"
  })
  const baseUrl = "https://www.dropbox.com/oauth2/authorize"
  const url = `${baseUrl}?${queryParams.toString()}`

  console.log("== url:", url)

  return (
    <>
      <button className="homepage" onClick={() => console.log('Button clicked!')}>
        <NavLink to = "/" className = "homelink"> <img src="https://cdn-icons-png.freepik.com/256/10263/10263239.png" alt="Homepage"/> </NavLink>
      </button>

      <div className="loginWrapper">
        <div className="loginCard">
          <h1>Welcome to Resume Roasts!</h1>    
          
          <a href={url}>Login with Dropbox</a>
        </div>
      </div>
    </>
  )
}