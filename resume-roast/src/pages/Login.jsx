import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import LoginLink from '../components/LoginLink'

export default function Login() {
    const [ error, setError ] = useState("")
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ success, setSuccess ] = useState(false)
    const [ cookies, setCookie ] = useCookies(["authCode"])
    const authCode = searchParams.get("code")
    
    useEffect(() => {
        async function exchangeForAccessToken(code) {
            const res = await fetch("/api/tokenExchange", {
                method: "POST",
                body: JSON.stringify({ code }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.status !== 200) {
                setError("Error exchanging code for token")
            } else {
                let expires = new Date()
                expires.setTime(expires.getTime() + (14400000)) // Token lasts 4 hours
                setCookie('authCode', authCode, {path: '/', expires})
                setSuccess(true)
            }
        }
        if (authCode) {
            exchangeForAccessToken(authCode)
        }
    }, [authCode, setCookie])

    return (
        <div>
            {error && !success && <p>Error: {error}</p>}
            {success ? <p>Success!</p> : <LoginLink />}
        </div>
    )
}