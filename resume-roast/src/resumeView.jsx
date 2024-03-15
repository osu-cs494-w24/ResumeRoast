import React from "react";
import { useState } from "react";
import DisplayPDF from "./components/displayPDF";

export default function ResumeView(){
    {/* Testing Purposes */}
    const pdfURL = "https://www.princexml.com/samples/invoice/invoicesample.pdf"
    return(
        <div>
            <h2>Hi!</h2>
            <DisplayPDF pdfURL={pdfURL}/>
        </div>
    )
}