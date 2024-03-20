import React from "react";
import { useState } from "react";
import TopBar from "./TopBar";
import DisqusComments from "../components/DisqusComments"
import { useParams } from "react-router-dom";

import "./ResumeView.css"
import './displayPDF.css'

export default function ResumeView(){
    const {id} = useParams()
    const [pdfLink, setPdfLink] = useState("")
    const fetchData = async () => {
        console.log(useParams())
        try {
            const response = await fetch("/api/pdf?id=" + id);
            const data = await response.json();
            const pdfLink  = "https://docs.google.com/viewer?url=\"" + data.link + "\"&embedded=true"
            setPdfLink(pdfLink)
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    fetchData();

    return(
        <div>
            <TopBar />
            <div className="ResumeViewContainer">
                <div className="column">
                    <div>
                        <iframe src={pdfLink} width="850px" height="1100px"></iframe>
                    </div>
                </div>
                <div className="column">
                    <DisqusComments id={id}/>
                </div>
            </div>
        </div>
    )
}
