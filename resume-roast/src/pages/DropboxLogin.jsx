import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import DropboxLoginLink from '../components/DropboxLoginLink'

export default function DropboxLogin() {
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
            {success ? <p>Success!</p> : <DropboxLoginLink />}
        </div>
    )
}