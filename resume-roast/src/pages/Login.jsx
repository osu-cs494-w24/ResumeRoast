import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import LoginLink from '../components/LoginLink'
// import App from '../App.jsx'

export default function Login() {
    const { hash } = useLocation();
    let access_token;
    const [ error, setError ] = useState("")
    const [ success, setSuccess ] = useState(false)

    if (hash) {
        access_token = hash.split("=")[1].split("&")[0];
    }

    console.log("== access_token:", access_token)
    useEffect(() => {
        async function exchangeForAccessToken(code) {
        const res = await fetch("https://api.dropboxapi.com/oauth2/token", {
            method: "POST",
            body: JSON.stringify({ code }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.status !== 200) {
            setError("Error exchanging code for token")
        } else {
            setSuccess(true)
        }
        }
        if (access_token) {
            exchangeForAccessToken(access_token)
        }
    }, [ access_token ])

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {success ? <p>Success!</p> : <LoginLink />}
            {/* {success ? <p>Success!</p> : <App />} */}
        </div>
    )
}