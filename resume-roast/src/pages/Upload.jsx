import { useState, useCallback } from 'react'
import { useCookies } from 'react-cookie'
import { useDropzone } from 'react-dropzone'

export default function Login() {
    const [ error, setError ] = useState("")
    const [ success, setSuccess ] = useState(false)
    const [ cookies, setCookie ] = useCookies(["authCode"])
    
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]
        const reader = new FileReader();
        reader.onabort = () => console.log("File Reading was aborted")
        reader.onerror = () => console.log("File Reading has failed")
        reader.onload = () => {
            const bytes = new Uint8Array(reader.result)
            console.log(bytes);
            async function uploadPDF(bytes) {
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: bytes,
                    headers: {
                        "Content-Type": "application/octet-stream",
                        "Auth-Code": cookies.authCode
                    }
                })
                if (res.status !== 200) {
                    setError("Error uploading PDF to Dropbox")
                } else {
                    console.log("PDF Generated at: " + res.body.link)
                    console.log("Version: " + res.body.version)
                    setSuccess(true)
                }
            }
            if (bytes) {
                uploadPDF(bytes)
            }
        }
        reader.readAsArrayBuffer(file);
    }, [cookies.authCode])

    const {getRootProps, getInputProps} = useDropzone({
        accept: { 
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        onDrop
    })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>
                {success && "File uploaded! Check Console."}
                {error && !success && "Error uploading resume."}
                {!success && !error && "Drag 'n' drop your resume here, or click to select the file"}
            </p>
        </div>
    )
}