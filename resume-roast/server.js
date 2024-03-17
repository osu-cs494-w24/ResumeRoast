import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'
import bodyParser from 'body-parser'

dotenv.config({ path: ".env.local" })

const client_id = process.env.VITE_DROPBOX_CLIENT_ID
const client_secret = process.env.DROPBOX_CLIENT_SECRET
const redirect_uri = process.env.VITE_OAUTH_REDIRECT_URL

console.log("== client_id:", client_id)
console.log("== client_secret:", client_secret)

const app = express()
const port = 8000
let pdfLinks = JSON.parse(fs.readFileSync('data.json'));
let tokens = {};

app.use(express.json())
app.use(bodyParser.raw({type: 'application/octet-stream', limit: '150mb'}))

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
            tokens[code] = {}
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
    const code = req.headers['auth-code']
    const pdf = new Uint8Array(req.body)
    if(!code || !tokens[code]){
        res.status(400).send({err: "Must specify auth code"})
    } else if(!pdf){
        res.status(400).send({err: "Must include pdf data"})
    } else {
        const url = "https://content.dropboxapi.com/2/files/upload"
        const args = {
            "autorename": true,
            "mode": "add",
            "mute": false,
            "path": "/resume.pdf",
            "strict_conflict": false
        }
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + tokens[code].token,
                'Dropbox-API-Arg': JSON.stringify(args),
                'Content-Type': 'application/octet-stream'
            },
            body: pdf
        }
        const dropboxRes = await fetch(url, fetchOptions);
        const dropboxResBody = await dropboxRes.json()
        if(!dropboxResBody){
            res.status(500).send({err: "Error uploading pdf to Dropbox"})
        }
        
        // Path in dropboxResBody.path_lower... Or dropboxResBody.path_display
        // Get Shareable Link!
        const shareURL = "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings"
        const shareData = {
            "path": dropboxResBody.path_lower,
            "settings": {
                "access": "viewer",
                "allow_download": true,
                "audience": "public",
                "requested_visibility": "public"
            }
        }
        const shareOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + tokens[code].token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shareData)
        }
        const shareRes= await fetch(shareURL, shareOptions);
        const shareResBody = await shareRes.json()

        if(!pdfLinks[tokens[code].id])
            pdfLinks[tokens[code].id] = []
        pdfLinks[tokens[code].id].unshift(shareResBody.url)

        // Update """database"""
        fs.writeFileSync('data.json', JSON.stringify(pdfLinks));

        res.status(200).send({msg: shareResBody.url})
    }
});
app.get("/api/allpdfs", async (req, res) => {
    let links = []
    for(let id in pdfLinks)
            links.push({id, link: pdfLinks[id][0]})
    res.status(200).send(links)
});
app.get("/api/pdf", async (req, res) => {
    const { id, version } = req.query
    if(pdfLinks[id][version? version : 0])
        res.status(200).send(pdfLinks[id][version? version : 0])
    else
        res.status(404).send()
});

app.listen(port, () => console.log(`API server listening on port ${port}`))