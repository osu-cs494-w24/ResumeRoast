import React from "react";
import './displayPDF.css'

export default function DisplayPDF(props){
    const pdfURL = props
    const pdfLink  = "https://docs.google.com/viewer?url=" + pdfURL.pdfURL + "&embedded=true"
    return(
        <div>
            <iframe src={pdfLink} width="900px" height="800px"></iframe>
        </div>
    )
}