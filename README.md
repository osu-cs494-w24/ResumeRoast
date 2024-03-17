# Resume Roast

A React.js powered Webapp using the [Dropbox API](https://www.dropbox.com/developers)
and [Disqus](https://disqus.com) for getting feedback on your resume. Upload
your resume to Dropbox using our OAuth API frontend, then leave feedback on
other people's resumes using the Disqus thread linked to each document.

## Configuration and Hosting

:octocat: **> git clone**

:package: **> npm i**

:page_facing_up: **Create .env.local**
```toml
DROPBOX_CLIENT_SECRET="{Get this from Dropbox}" # Or from Will if you are on the team
VITE_DROPBOX_CLIENT_ID="{This is also from Dropbox}" # Or from Will if you are on the team
VITE_OAUTH_REDIRECT_URL="{Your absolute path to /login (Like http://localhost:5173/login)}"
```
:runner: **Run these in parallel!**
```bash
npm run api # Runs the backend server on port 8000
npm run dev # Runs the webserver, and proxies /api to :8000
```
## Routes

<details>
<summary> Website Routes </summary>

**:house: /**

**:key: /login**

**:orange_book: /r/**

**:smiley: /me**

**:scroll: /about**

</details>

---

<details>
<summary> API Routes </summary>

**:coin: /api/tokenExchange**

```json
"method": "POST",
"body": {
    "code": "{Authentication Code granted by Dropbox}"
}
```
<center><p align="center">:arrow_down:</p></center>

```json
"status": 200,
```

**:arrow_up: /api/upload**

```json
"method": "POST",
"body": "{Byte array of PDF file}"
"header": {
    "Auth-Code": "{Authentication Code granted by Dropbox}",
    "Content-Type": "application/octet-stream",
}
```
<center><p align="center">:arrow_down:</p></center>

```json
"status": 200,
"content-type": "application/json",
"body": {
    "link": "{Dropbox link to pdf file}",
    "version": "{Number of pdfs associated with this user}"
}
```

**:books: /api/allpdfs**

```json
"method": "GET",
```
<center><p align="center">:arrow_down:</p></center>

```json
"status": 200,
"content-type": "application/json",
"body": [
    {
        "id": "{Dropbox User ID}", 
        "link": "{Link to this user's latest resume}"
    }
]
```

**:green_book: /api/pdf**

```json
"method": "GET",
"queryParameters": {
    "id": "{Dropbox User ID}",
    "version": "[OPTIONAL] {Number used to identify older resume version}"
}
```
<center><p align="center">:arrow_down:</p></center>

```json
"status": 200,
"content-type": "application/json",
"body": {
    "link": "{Link to pdf file}",
}
```

**:camera: /api/thumbnail**

```json
"method": "GET",
"queryParameters": {
    "id": "{Dropbox User ID for pdf owner (used for caching)}"
}
```

<center><p align="center">:arrow_down:</p></center>

```json
"status": 200,
"content-type": "image/png",
"body": "{Thumbnail Image Data}"
```
</details>

## Data Storage

**:old_key: Dropbox Access Tokens**

Dropbox Access Tokens are only kept in runtime storage on the server.
They are kept in a variable `tokens` in `server.js`, and each one is
deleted every 4 hours as it expires according to Dropbox. Each access
token is paired with the authentication code used to generate it, so that
the server can identify each client. The structure of `tokens` is as so:
```json
{
    "{Dropbox Authentication Code}": {
        "token": "{Latest Dropbox Access Token for that User}",
        "id": "{Dropbox User ID}"
    }
}
```

**:chains: Public PDF Links**

A similar object is kept to store the links we generate for each uploaded
pdf, with the biggest difference being that this object is instantiated by
reading in `data.json`, and each time a new pdf is added, we modify 
`data.json`. The structure of `pdfLinks`/`data.json` is as so:
```json
{
    "{Dropbox User ID}": ["{Array of pdf links, with latest at the start}"]
}
```

**:framed_picture: PDF Thumbnail Images**

Upon each new resume upload, a thumbnail for the pdf is generated and stored
in `/thumbnails`. A thumbnail is only kept for the latest pdf generated for
each user. The thumbnail is named using the Dropbox User ID for the account,
minus the `dbid:` at the start, and in the `.png` format. The API route
`/api/thumbnail` handles removing the `dbid:` from the Dropbox User ID.