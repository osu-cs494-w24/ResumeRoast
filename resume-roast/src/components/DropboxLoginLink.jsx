export default function DropboxLoginLink() {
  const queryParams = new URLSearchParams({
    client_id: import.meta.env.VITE_DROPBOX_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URL,
    response_type: "code"
  })
  const baseUrl = "https://www.dropbox.com/oauth2/authorize"
  const url = `${baseUrl}?${queryParams.toString()}`

  console.log("== url:", url)

  return <a href={url}>Login with Dropbox</a>
}