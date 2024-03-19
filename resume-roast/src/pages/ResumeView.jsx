import React from "react";
import { useState } from "react";
import DisplayPDF from "../components/displayPDF";
import TopBar from "./TopBar";
import DisqusComments from "../components/DisqusComments"
import { useParams } from "react-router-dom";

import "./ResumeView.css"

export default function ResumeView(){
    const {id} = useParams()
    const [pdfLink, setPdfLink] = useState("")
    const fetchData = async () => {
        try {
            const response = await fetch("/api/pdf?id=" + id);
            const data = await response.json();
            setPdfLink(data.link)
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
                    <DisplayPDF pdfUrl={pdfLink}/>
                </div>
                <div className="column">
                    <DisqusComments id={id}/>
                </div>
            </div>
        </div>
    )
}