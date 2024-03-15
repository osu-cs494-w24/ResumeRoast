import React from "react";

export default function DisplayPDF(props){
    const {pdfURL} = props
    const pdfLink  = "https://docs.google.com/viewer?url=" + pdfURL + "&embedded=true"
    return(
        <div>
            <p>PDF</p>
            <iframe src={pdfLink} width="1173px" height="794px"></iframe>
        </div>
    )
}