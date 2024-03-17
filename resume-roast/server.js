import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: ".env.local" })

const client_id = process.env.VITE_DROPBOX_CLIENT_ID
const client_secret = process.env.DROPBOX_CLIENT_SECRET
const redirect_uri = process.env.VITE_OAUTH_REDIRECT_URL

console.log("== client_id:", client_id)
console.log("== client_secret:", client_secret)

const app = express()
const port = 8000
let data = JSON.parse(fs.readFileSync('data.json'));
let tokens = {};

app.use(express.json())

app.post("/api/tokenExchange", async (req, res) => {
    const { code } = req.body
    if (!code) {
        res.status(400).send({ err: "Must specify auth code" })
    } else {
        const baseUrl = "https://api.dropbox.com/oauth2/token"
        const queryParams= new URLSearchParams({
            code: code,
            grant_type: "authorization_code",
            redirect_uri: redirect_uri,
            client_id: client_id,
            client_secret: client_secret,
        })
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const url = `${baseUrl}?${queryParams.toString()}`
        const dropboxRes = await fetch(url, fetchOptions);

        const dropboxResBody = await dropboxRes.json()

        if (dropboxResBody.access_token) {
            tokens[code].token = dropboxResBody.access_token
            tokens[code].id    = dropboxResBody.account_id
            // Delete token association when the token expires
            setTimeout(()=>{delete tokens[code]}, dropboxResBody.expires_in * 1000)
            res.status(200).send({ msg: "OK!" })
        } else {
            res.status(401).send({
                err: dropboxResBody.error_description
            })
        }
    }
})

app.post("/api/upload", async (req, res) => {

});
app.get("/api/allpdfs", async (req, res) => {

});
app.get("/api/pdf", async (req, res) => {

});

app.listen(port, () => console.log(`API server listening on port ${port}`))