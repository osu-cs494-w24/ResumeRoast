import express from 'express'
import dotenv from 'dotenv'

dotenv.config({ path: ".env.local" })

const client_id = process.env.VITE_DROPBOX_CLIENT_ID
const client_secret = process.env.DROPBOX_CLIENT_SECRET
let access_token = null

console.log("== client_id:", client_id)
console.log("== client_secret:", client_secret)

const app = express()
const port = 8000

app.use(express.json())

app.post("/api/tokenExchange", async (req, res) => {
    const { code } = req.body
    console.log("== code:", code)
    if (!code) {
        res.status(400).send({ err: "Must specify auth code" })
    } else {
        const dropboxRes = await fetch("https://www.dropbox.com/oauth2/token", {
        method: "POST",
        body: JSON.stringify({
            client_id: client_id,
            client_secret: client_secret,
            code: code,
            grant_type: "authorization_code"
        }),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        })
        const dropboxResBody = await dropboxRes.json()
        if (dropboxResBody.access_token) {
            access_token = dropboxResBody.access_token
            res.status(200).send({ msg: "OK!" })
        } else {
            res.status(401).send({
                err: dropboxResBody.error_description
            })
        }
    }
})

app.listen(port, () => console.log(`API server listening on port ${port}`))